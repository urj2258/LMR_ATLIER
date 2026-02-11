
"use client";

import { useState, useEffect } from "react";
import { adminFetch, updateCache } from "@/utils/adminFetcher";

interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
}

export default function CategoriesClient() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminFetch("/api/categories");
                setCategories(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        // Auto-generate slug
        setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !slug) return;

        setIsSaving(true);
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    slug,
                    order: categories.length + 1
                })
            });
            const newCat = await res.json();
            const updated = [...categories, newCat];
            setCategories(updated);
            updateCache("/api/categories", updated);
            setName("");
            setSlug("");
        } catch (err) {
            console.error(err);
            alert("Failed to add category");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will not delete products, but they will become uncategorized.")) return;

        try {
            await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
            const updated = categories.filter(c => c.id !== id);
            setCategories(updated);
            updateCache("/api/categories", updated);
        } catch (err) {
            console.error(err);
            alert("Failed to delete");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Col: Form */}
            <div className="lg:col-span-1">
                <div className="bg-white border border-[#eeeeee] p-8 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 pb-4 border-b border-[#eeeeee]">Add New Category</h3>
                    <form onSubmit={handleAdd} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Display Name</label>
                            <input
                                required
                                value={name}
                                onChange={handleNameChange}
                                placeholder="e.g. Velvet Edition"
                                className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#bd870a] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">URL Slug</label>
                            <input
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] outline-none focus:ring-1 focus:ring-[#bd870a] text-black/40 italic"
                            />
                        </div>
                        <button
                            disabled={isSaving}
                            type="submit"
                            className="w-full bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold py-4 hover:bg-[#bd870a] transition-all disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Create Collection"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Col: List */}
            <div className="lg:col-span-2">
                <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#eeeeee] bg-[#fcfaf7]/50">
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Collection Name</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Slug</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eeeeee]">
                            {isLoading ? (
                                <tr><td colSpan={3} className="px-8 py-12 text-center text-[10px] uppercase tracking-widest text-black/20 animate-pulse">Loading collections...</td></tr>
                            ) : categories.length === 0 ? (
                                <tr><td colSpan={3} className="px-8 py-12 text-center text-[10px] uppercase tracking-widest text-black/20 italic">No collections found. Add your first one to the left.</td></tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-[#fcfaf7]/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-bold uppercase tracking-widest group-hover:text-[#bd870a] transition-colors">{cat.name}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] text-black/40 font-mono tracking-tight">/collections/{cat.slug}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="text-[10px] uppercase tracking-widest font-bold text-[#cc3333]/40 hover:text-[#cc3333] transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 p-6 bg-[#fcfaf7] border border-[#eeeeee] rounded-sm">
                    <div className="flex gap-4 items-start">
                        <span className="material-symbols-outlined text-[#bd870a] text-lg mt-0.5">info</span>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Scale with Confidence</p>
                            <p className="text-[9px] uppercase tracking-widest text-black/40 leading-relaxed">
                                Categories added here will automatically appear as filters on your Products page and as options during product creation. No code changes required.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
