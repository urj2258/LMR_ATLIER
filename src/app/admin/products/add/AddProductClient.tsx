
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageCropper from "@/components/admin/ImageCropper";

interface ImageItem {
    id: string;
    originalFile: File;
    previewUrl: string;
    croppedBlob: Blob | null;
}

export default function AddProductClient() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    // Multiple Images State
    const [images, setImages] = useState<ImageItem[]>([]);
    const [currentCropImage, setCurrentCropImage] = useState<ImageItem | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("Price on Request");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [sizeChart, setSizeChart] = useState("");
    const [measurementGuide, setMeasurementGuide] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("8 to 12 weeks");
    const [shipping, setShipping] = useState("We deliver worldwide. Shipping rates may apply.");
    const [customization, setCustomization] = useState("For customization please contact our fashion consultant");
    const [priceInfo, setPriceInfo] = useState("");

    useEffect(() => {
        const load = async () => {
            const data = await (await fetch("/api/categories")).json();
            setCategories(data);
        };
        load();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            filesArray.forEach(file => {
                const newImage: ImageItem = {
                    id: `${Date.now()}-${Math.random()}`,
                    originalFile: file,
                    previewUrl: URL.createObjectURL(file),
                    croppedBlob: null
                };

                setImages(prev => [...prev, newImage]);
            });

            // Reset input
            e.target.value = '';
        }
    };

    const openCropper = (image: ImageItem) => {
        setCurrentCropImage(image);
        setShowCropper(true);
    };

    const handleCropComplete = (blob: Blob) => {
        if (currentCropImage) {
            setImages(prev => prev.map(img =>
                img.id === currentCropImage.id
                    ? { ...img, croppedBlob: blob, previewUrl: URL.createObjectURL(blob) }
                    : img
            ));
        }
        setShowCropper(false);
        setCurrentCropImage(null);
    };

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const moveImage = (id: string, direction: 'up' | 'down') => {
        setImages(prev => {
            const index = prev.findIndex(img => img.id === id);
            if (index === -1) return prev;

            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prev.length) return prev;

            const newImages = [...prev];
            [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
            return newImages;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (images.length === 0) {
            alert("Please upload at least 1 image for the product.");
            return;
        }

        setIsLoading(true);

        try {
            const imageUrls: string[] = [];

            // Upload all images
            for (const image of images) {
                const fileToUpload = image.croppedBlob || image.originalFile;
                const formData = new FormData();

                if (fileToUpload instanceof Blob && !(fileToUpload instanceof File)) {
                    formData.append("file", fileToUpload, image.originalFile.name);
                } else {
                    formData.append("file", fileToUpload);
                }

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
                imageUrls.push(uploadData.url);
            }

            // Create Product
            // Find the selected category object to check if it has a parent
            const selectedCategory = categories.find(cat => cat.name === category);
            const parentCategory = selectedCategory?.mainCategory || category;
            const subcategoryName = selectedCategory?.mainCategory ? category : '';

            const productData = {
                title,
                category: parentCategory,
                subcategory: subcategoryName,
                price,
                description,
                images: imageUrls,
                slug: title.toLowerCase().replace(/ /g, '-'),
                color: '',
                fabric: '',
                details: '',
                sku,
                sizeChart,
                measurementGuide,
                deliveryTime,
                shipping,
                customization,
                priceInfo
            };

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                const { invalidateCache } = await import("@/utils/adminFetcher");
                invalidateCache('/api/products');
                invalidateCache('/api/admin/stats');

                router.push("/admin/products");
                router.refresh();
            } else {
                alert("Failed to create product");
            }

        } catch (error) {
            console.error("Error adding product:", error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 mx-auto">
            {showCropper && currentCropImage && (
                <ImageCropper
                    imageSrc={currentCropImage.previewUrl}
                    onCropComplete={handleCropComplete}
                    onCancel={() => {
                        setShowCropper(false);
                        setCurrentCropImage(null);
                    }}
                    aspect={3 / 4}
                />
            )}

            <div className="mb-10">
                <h1 className="text-lg font-bold tracking-[0.3em] uppercase mb-2 font-serif">Add New Product</h1>
                <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium italic">Catalogue Management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3">
                        Product Images <span className="text-red-800">*</span>
                        <span className="text-black/40 font-normal ml-2">(Upload 1 or more images)</span>
                    </label>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-black/10 hover:border-[#bd870a]/50 transition-colors flex flex-col items-center justify-center p-6 bg-[#fcfaf7]/30 group cursor-pointer relative">
                        <input
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <span className="material-symbols-outlined text-4xl text-black/20 group-hover:text-[#bd870a] mb-4">add_photo_alternate</span>
                        <p className="text-xs text-black/40 uppercase tracking-widest font-medium text-center">
                            Click to add images or <span className="text-[#bd870a] underline">browse</span>
                        </p>
                        <p className="text-[9px] text-black/20 uppercase tracking-[0.1em] mt-2 italic font-serif">
                            Upload one or multiple images (no limit)
                        </p>
                    </div>

                    {/* Image Grid */}
                    {images.length > 0 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-black/60">
                                    {images.length} Image{images.length !== 1 ? 's' : ''} Added
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <div key={image.id} className="relative group border border-black/10 bg-white shadow-sm">
                                        <div className="aspect-[3/4] relative">
                                            <img
                                                src={image.previewUrl}
                                                className="w-full h-full object-cover"
                                                alt={`Product ${index + 1}`}
                                            />

                                            {/* Order Badge */}
                                            <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                                #{index + 1}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openCropper(image)}
                                                        className="bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-lg transition-all"
                                                        title="Crop Image"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">crop</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(image.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all"
                                                        title="Remove Image"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reorder Buttons */}
                                        <div className="absolute bottom-2 right-2 flex gap-1">
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(image.id, 'up')}
                                                    className="bg-white/90 hover:bg-white text-black p-1 rounded shadow transition-all"
                                                    title="Move Left"
                                                >
                                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                                </button>
                                            )}
                                            {index < images.length - 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(image.id, 'down')}
                                                    className="bg-white/90 hover:bg-white text-black p-1 rounded shadow transition-all"
                                                    title="Move Right"
                                                >
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="title">Product Title <span className="text-red-800">*</span></label>
                        <input
                            className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                            id="title"
                            placeholder="e.g. Ivory Silk Ensemble"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="category">Collection <span className="text-red-800">*</span></label>
                        <select
                            className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors appearance-none cursor-pointer outline-none"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a collection</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="price">Price</label>
                    <input
                        className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                        id="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="desc">Description</label>
                    <textarea
                        className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none resize-none"
                        id="desc"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="sku">SKU / Reference Number</label>
                                <input
                                    className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                                    id="sku"
                                    placeholder="e.g. MB 8"
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Accordion Content Sections */}
                        <div className="border-t border-black/10 pt-8 mt-8">
                            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/80 mb-6">Product Detail Page Content</h3>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Size Chart
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={4}
                                    value={sizeChart}
                                    onChange={(e) => setSizeChart(e.target.value)}
                                    placeholder="Enter size chart information..."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Measurement Guide
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={4}
                                    value={measurementGuide}
                                    onChange={(e) => setMeasurementGuide(e.target.value)}
                                    placeholder="Enter measurement guide..."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Delivery Time
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={deliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                    placeholder="e.g. 8 to 12 weeks"
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Shipping Information
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value)}
                                    placeholder="e.g. We deliver worldwide. Shipping rates may apply."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Customization
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={customization}
                                    onChange={(e) => setCustomization(e.target.value)}
                                    placeholder="e.g. For customization please contact our fashion consultant"
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Price Information
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={priceInfo}
                                    onChange={(e) => setPriceInfo(e.target.value)}
                                    placeholder="Enter pricing details or payment options..."
                                />
                            </details>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="sku">SKU / Reference Number</label>
                                <input
                                    className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                                    id="sku"
                                    placeholder="e.g. MB 8"
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Accordion Content Sections */}
                        <div className="border-t border-black/10 pt-8 mt-8">
                            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/80 mb-6">Product Detail Page Content</h3>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Size Chart
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={4}
                                    value={sizeChart}
                                    onChange={(e) => setSizeChart(e.target.value)}
                                    placeholder="Enter size chart information..."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Measurement Guide
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={4}
                                    value={measurementGuide}
                                    onChange={(e) => setMeasurementGuide(e.target.value)}
                                    placeholder="Enter measurement guide..."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Delivery Time
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={deliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                    placeholder="e.g. 8 to 12 weeks"
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Shipping Information
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value)}
                                    placeholder="e.g. We deliver worldwide. Shipping rates may apply."
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Customization
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={customization}
                                    onChange={(e) => setCustomization(e.target.value)}
                                    placeholder="e.g. For customization please contact our fashion consultant"
                                />
                            </details>

                            <details className="group mb-4">
                                <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Price Information
                                </summary>
                                <textarea
                                    className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                    rows={3}
                                    value={priceInfo}
                                    onChange={(e) => setPriceInfo(e.target.value)}
                                    placeholder="Enter pricing details or payment options..."
                                />
                            </details>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="sku">SKU / Reference Number</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                                id="sku"
                                placeholder="e.g. MB 8"
                                type="text"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Accordion Content Sections */}
                    <div className="border-t border-black/10 pt-8 mt-8">
                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/80 mb-6">Product Detail Page Content</h3>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Size Chart
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={4}
                                value={sizeChart}
                                onChange={(e) => setSizeChart(e.target.value)}
                                placeholder="Enter size chart information..."
                            />
                        </details>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Measurement Guide
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={4}
                                value={measurementGuide}
                                onChange={(e) => setMeasurementGuide(e.target.value)}
                                placeholder="Enter measurement guide..."
                            />
                        </details>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Delivery Time
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={3}
                                value={deliveryTime}
                                onChange={(e) => setDeliveryTime(e.target.value)}
                                placeholder="e.g. 8 to 12 weeks"
                            />
                        </details>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Shipping Information
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={3}
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                                placeholder="e.g. We deliver worldwide. Shipping rates may apply."
                            />
                        </details>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Customization
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={3}
                                value={customization}
                                onChange={(e) => setCustomization(e.target.value)}
                                placeholder="e.g. For customization please contact our fashion consultant"
                            />
                        </details>

                        <details className="group mb-4">
                            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                Price Information
                            </summary>
                            <textarea
                                className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
                                rows={3}
                                value={priceInfo}
                                onChange={(e) => setPriceInfo(e.target.value)}
                                placeholder="Enter pricing details or payment options..."
                            />
                        </details>
                    </div>

                </div>

                <div className="flex items-center justify-end gap-6 pt-6">
                    <Link href="/admin/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors">
                        Cancel
                    </Link>
                    <button
                        className="bg-[#121212] text-white px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50"
                        type="submit"
                        disabled={isLoading || images.length === 0}
                    >
                        {isLoading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

