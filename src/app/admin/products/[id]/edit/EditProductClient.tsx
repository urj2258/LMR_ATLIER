
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { sanitizeImages } from "@/utils/imageHelper";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface ProductState {
    id: string;
    title: string;
    slug: string;
    category: string;
    subcategory: string;
    price: string;
    images: string[];
    description: string;
    color: string;
    fabric: string;
    deliveryTime: string;
    sku: string;
    [key: string]: any; // Allow for other fields
}

export default function EditProductClient({ product, categories }: { product: any, categories: Category[] }) {
    const router = useRouter();
    const [formData, setFormData] = useState<ProductState>({
        ...product,
        images: sanitizeImages(product.images)
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: ProductState) => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug if title changes and slug is currently derived from title
            if (name === "title" && (!prev.slug || prev.slug === slugify(prev.title))) {
                newData.slug = slugify(value);
            }
            return newData;
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newImages = [...formData.images];

        try {
            for (let i = 0; i < files.length; i++) {
                const formDataUpload = new FormData();
                formDataUpload.append("file", files[i]);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataUpload,
                });

                if (res.ok) {
                    const data = await res.json();
                    newImages.push(data.url);
                }
            }
            setFormData((prev: ProductState) => ({ ...prev, images: newImages }));
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload some images");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData((prev: ProductState) => ({ ...prev, images: newImages }));
    };

    const setAsPrimary = (index: number) => {
        const newImages = [...formData.images];
        const [img] = newImages.splice(index, 1);
        newImages.unshift(img);
        setFormData((prev: ProductState) => ({ ...prev, images: newImages }));
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        const newImages = [...formData.images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newImages.length) return;
        
        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setFormData((prev: ProductState) => ({ ...prev, images: newImages }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch("/api/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Invalidate cache and redirect
                const { invalidateCache } = await import("@/utils/adminFetcher");
                invalidateCache('/api/products');
                router.push("/admin/products");
                router.refresh();
            } else {
                alert("Failed to save product");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Error saving product");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-24">
            <header className="flex items-center gap-4 mb-12">
                <Link href="/admin/products" className="text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-serif">Edit Product</h1>
                    <p className="text-[10px] uppercase tracking-widest text-black/40">SKU: {product.sku}</p>
                </div>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Basic Info */}
                    <div className="bg-white border border-[#eeeeee] p-8 space-y-6">
                        <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-[#eeeeee] pb-4 mb-6">General Information</h2>
                        
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Product Title</label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none uppercase tracking-widest"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Category</label>
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none uppercase tracking-widest"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Subcategory</label>
                                <input
                                    name="subcategory"
                                    type="text"
                                    value={formData.subcategory}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none uppercase tracking-widest"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Slug</label>
                            <input
                                name="slug"
                                type="text"
                                required
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none tracking-tight text-black/60"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Image Management */}
                    <div className="bg-white border border-[#eeeeee] p-8">
                        <div className="flex justify-between items-center border-b border-[#eeeeee] pb-4 mb-8">
                            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold">Image Gallery</h2>
                            <label className="cursor-pointer bg-[#bd870a]/10 text-[#bd870a] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#bd870a]/20 transition-all">
                                {isUploading ? 'Uploading...' : 'Upload Images'}
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.images.map((img: string, i: number) => (
                                <div key={i} className="group relative aspect-[3/4] bg-gray-50 border border-[#eeeeee] overflow-hidden">
                                    <Image src={img} alt={`Preview ${i}`} fill className="object-cover" sizes="200px" />
                                    
                                    {/* Badges */}
                                    {i === 0 && (
                                        <div className="absolute top-2 left-2 bg-black text-white text-[8px] font-bold uppercase px-2 py-1 tracking-widest z-10 shadow-sm">
                                            Primary
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                        {i !== 0 && (
                                            <button 
                                                type="button"
                                                onClick={() => setAsPrimary(i)}
                                                className="w-full bg-white text-black text-[9px] font-bold uppercase py-1.5 hover:bg-[#bd870a] hover:text-white transition-colors"
                                            >
                                                Make Primary
                                            </button>
                                        )}
                                        <div className="flex w-full gap-1">
                                            <button 
                                                type="button"
                                                onClick={() => moveImage(i, 'up')}
                                                disabled={i === 0}
                                                className="flex-1 bg-white/20 text-white hover:bg-white/40 p-1 disabled:opacity-20"
                                            >
                                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => moveImage(i, 'down')}
                                                disabled={i === formData.images.length - 1}
                                                className="flex-1 bg-white/20 text-white hover:bg-white/40 p-1 disabled:opacity-20"
                                            >
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="w-full bg-red-600 text-white text-[9px] font-bold uppercase py-1.5 hover:bg-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-10">
                    <div className="bg-white border border-[#eeeeee] p-8 space-y-6">
                        <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-[#eeeeee] pb-4 mb-6">Product Details</h2>
                        
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Price Label</label>
                            <input
                                name="price"
                                type="text"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Color</label>
                            <input
                                name="color"
                                type="text"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Fabric</label>
                            <input
                                name="fabric"
                                type="text"
                                value={formData.fabric}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Delivery Time</label>
                            <input
                                name="deliveryTime"
                                type="text"
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                className="w-full bg-white border border-[#eeeeee] focus:border-black py-3 px-4 text-xs transition-colors outline-none rounded-none"
                            />
                        </div>
                    </div>

                    <div className="sticky top-28 space-y-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-[#bd870a] text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#a67609] transition-all shadow-md disabled:opacity-50"
                        >
                            {isSaving ? 'Saving Changes...' : 'Save Product'}
                        </button>
                        <Link
                            href="/admin/products"
                            className="block w-full bg-white border border-[#eeeeee] text-black text-center py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
