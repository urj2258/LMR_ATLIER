
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageCropper from "@/components/admin/ImageCropper";

export default function AddProductClient() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    // Image Handling States
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("Price on Request");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const load = async () => {
            const data = await (await fetch("/api/categories")).json();
            setCategories(data);
        };
        load();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOriginalFile(file);

            // Create preview and open cropper
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setShowCropper(true);
        }
    };

    const handleCropComplete = (blob: Blob) => {
        setCroppedBlob(blob);
        // Create a new preview URL for the cropped image
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setShowCropper(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = "";

            // 1. Upload Image (Prefer cropped blob, fallback to original file)
            const fileToUpload = croppedBlob || originalFile;

            if (fileToUpload) {
                const formData = new FormData();
                // If it's a Blob (from cropper), we need to give it a filename
                if (fileToUpload instanceof Blob && !(fileToUpload instanceof File)) {
                    formData.append("file", fileToUpload, originalFile?.name || "image.jpg");
                } else {
                    formData.append("file", fileToUpload);
                }

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
                imageUrl = uploadData.url;
            }

            // 2. Create Product
            const productData = {
                title,
                category,
                price,
                description,
                images: imageUrl ? [imageUrl] : [],
                slug: title.toLowerCase().replace(/ /g, '-')
            };

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                // Invalidate caches so the catalog and dashboard show the new product
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
        <div className="w-full max-w-2xl bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 mx-auto">
            {showCropper && previewUrl && (
                <ImageCropper
                    imageSrc={previewUrl}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setShowCropper(false)}
                    aspect={3 / 4} // Portfolio aspect ratio
                />
            )}

            <div className="mb-10">
                <h1 className="text-lg font-bold tracking-[0.3em] uppercase mb-2 font-serif">Add New Product</h1>
                <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium italic">Catalogue Management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3">Product Image</label>
                    <div className="border-2 border-dashed border-black/10 hover:border-[#bd870a]/50 transition-colors flex flex-col items-center justify-center p-4 bg-[#fcfaf7]/30 group cursor-pointer relative min-h-[200px]">
                        <input
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required={!previewUrl}
                        />

                        {previewUrl ? (
                            <div className="relative w-full aspect-[3/4] max-w-[240px] shadow-xl border border-black/5 group-hover:opacity-90 transition-opacity">
                                <img
                                    src={previewUrl}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                    <span className="material-symbols-outlined text-white text-3xl mb-1">published_with_changes</span>
                                    <p className="text-[9px] text-white uppercase tracking-widest font-bold">Change Image</p>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-2 z-20">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowCropper(true);
                                        }}
                                        className="bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all"
                                        title="Crop Image"
                                    >
                                        <span className="material-symbols-outlined text-sm">crop</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-4xl text-black/20 group-hover:text-[#bd870a] mb-4">cloud_upload</span>
                                <p className="text-xs text-black/40 uppercase tracking-widest font-medium text-center">Drag and drop imagery or <span className="text-[#bd870a] underline">browse</span></p>
                                <p className="text-[9px] text-black/20 uppercase tracking-[0.1em] mt-2 italic font-serif">Recommended: High Resolution Portrait</p>
                            </>
                        )}
                    </div>
                    {previewUrl && (
                        <p className="text-[9px] uppercase tracking-widest text-[#bd870a] font-bold mt-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-xs">verified</span> Ready for upload
                        </p>
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
                </div>

                <div className="flex items-center justify-end gap-6 pt-6">
                    <Link href="/admin/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors">
                        Cancel
                    </Link>
                    <button
                        className="bg-[#121212] text-white px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
