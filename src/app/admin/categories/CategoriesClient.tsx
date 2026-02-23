
"use client";

import { useState, useEffect } from "react";
import { adminFetch, updateCache } from "@/utils/adminFetcher";

interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    mainCategory?: string;
}

const DEFAULT_MAIN_CATEGORIES = ['Women Wear', 'Menswear', 'Little Ones'];

// Default sub-categories for Women Wear (auto-seeded if missing, but editable)
const DEFAULT_WOMEN_SUBCATEGORIES = [
    { name: 'Bridal Edit', slug: 'bridal-edit', mainCategory: 'Women Wear' },
    { name: 'Wedding Edit', slug: 'wedding-edit', mainCategory: 'Women Wear' },
    { name: 'Formal Edit', slug: 'formal-edit', mainCategory: 'Women Wear' }
];

export default function CategoriesClient() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isCreatingNewMain, setIsCreatingNewMain] = useState(false);
    const [mainCategory, setMainCategory] = useState<string>("");
    const [newMainCategory, setNewMainCategory] = useState<string>("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminFetch("/api/categories");

                // Auto-seed default Women Wear sub-categories if they don't exist
                const defaultsToAdd: Category[] = [];
                for (const defaultCat of DEFAULT_WOMEN_SUBCATEGORIES) {
                    const exists = data.some((cat: Category) =>
                        cat.slug === defaultCat.slug && cat.mainCategory === 'Women Wear'
                    );
                    if (!exists) {
                        defaultsToAdd.push({
                            id: `default-${defaultCat.slug}-${Date.now()}`,
                            name: defaultCat.name,
                            slug: defaultCat.slug,
                            mainCategory: defaultCat.mainCategory,
                            order: data.length + defaultsToAdd.length,
                            createdAt: new Date().toISOString()
                        } as Category);
                    }
                }

                // If defaults need to be added, save them to the database
                if (defaultsToAdd.length > 0) {
                    for (const cat of defaultsToAdd) {
                        await fetch("/api/categories", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(cat)
                        });
                    }
                    // Reload categories after seeding
                    const updatedData = await adminFetch("/api/categories");
                    setCategories(updatedData);
                } else {
                    setCategories(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    // Get unique main categories: combine defaults with any custom ones from database
    const dbMainCategories = categories.map(c => c.mainCategory).filter(Boolean) as string[];
    const existingMainCategories = Array.from(
        new Set([...DEFAULT_MAIN_CATEGORIES, ...dbMainCategories])
    ).sort();

    // Debug: Log categories to see their mainCategory values
    console.log('All categories:', categories);
    console.log('Existing main categories:', existingMainCategories);

    const handleSubCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSubCategoryName(val);
        // Auto-generate slug
        setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
    };

    const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMainCategory(e.target.value);
        // Reset sub-category form inputs only (not stored data)
        setSubCategoryName("");
        setSlug("");
    };

    const handleNewMainCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMainCategory(e.target.value);
        // Reset sub-category form inputs only (not stored data)
        setSubCategoryName("");
        setSlug("");
    };

    const handleToggleMode = () => {
        setIsCreatingNewMain(!isCreatingNewMain);
        setMainCategory("");
        setNewMainCategory("");
        setSubCategoryName("");
        setSlug("");
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedMainCategory = isCreatingNewMain ? newMainCategory : mainCategory;

        if (!selectedMainCategory || !subCategoryName || !slug) return;

        setIsSaving(true);
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: subCategoryName,
                    slug,
                    mainCategory: selectedMainCategory,
                    order: categories.length + 1
                })
            });
            const newCat = await res.json();
            const updated = [...categories, newCat];
            setCategories(updated);
            updateCache("/api/categories", updated);
            setMainCategory("");
            setNewMainCategory("");
            setSubCategoryName("");
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

    // Group categories by main category (filter at render time only)
    const groupedCategories = existingMainCategories.map(main => ({
        mainCategory: main,
        subCategories: categories.filter(c => c.mainCategory === main)
    }));

    const currentMainCategory = isCreatingNewMain ? newMainCategory : mainCategory;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Col: Form */}
            <div className="lg:col-span-1">
                <div className="bg-white border border-[#eeeeee] p-8 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 pb-4 border-b border-[#eeeeee]">Add New Category</h3>
                    <form onSubmit={handleAdd} className="space-y-6">
                        {/* Toggle Button */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-[#fcfaf7] rounded">
                            <span className="text-[9px] uppercase tracking-widest font-bold text-black/60">
                                {isCreatingNewMain ? "Creating New Main Category" : "Using Existing Main Category"}
                            </span>
                            <button
                                type="button"
                                onClick={handleToggleMode}
                                className="text-[9px] uppercase tracking-widest font-bold text-[#bd870a] hover:text-black transition-colors"
                            >
                                {isCreatingNewMain ? "Use Existing" : "Create New"}
                            </button>
                        </div>

                        {/* Main Category Selection or Input */}
                        {!isCreatingNewMain ? (
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Main Category</label>
                                <select
                                    required
                                    value={mainCategory}
                                    onChange={handleMainCategoryChange}
                                    className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#bd870a] transition-all"
                                >
                                    <option value="">Select Main Category</option>
                                    {existingMainCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">New Main Category Name</label>
                                <input
                                    required
                                    value={newMainCategory}
                                    onChange={handleNewMainCategoryChange}
                                    placeholder="e.g. Accessories"
                                    className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#bd870a] transition-all"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Sub-Category Name</label>
                            <input
                                required
                                value={subCategoryName}
                                onChange={handleSubCategoryChange}
                                placeholder="e.g. Bridal Collection"
                                disabled={!currentMainCategory}
                                className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#bd870a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">URL Slug</label>
                            <input
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                disabled={!currentMainCategory}
                                className="w-full px-4 py-3 bg-[#fcfaf7] border-0 text-[11px] outline-none focus:ring-1 focus:ring-[#bd870a] text-black/40 italic disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <button
                            disabled={isSaving || !currentMainCategory}
                            type="submit"
                            className="w-full bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold py-4 hover:bg-[#bd870a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Saving..." : "Create Collection"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Col: List */}
            <div className="lg:col-span-2">
                <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="px-8 py-12 text-center text-[10px] uppercase tracking-widest text-black/20 animate-pulse">Loading collections...</div>
                    ) : groupedCategories.length === 0 ? (
                        <div className="px-8 py-12 text-center text-[10px] uppercase tracking-widest text-black/20 italic">
                            No categories yet. Add your first one to the left.
                        </div>
                    ) : (
                        <div>
                            {groupedCategories.map(group => (
                                <div key={group.mainCategory} className="border-b border-[#eeeeee] last:border-b-0">
                                    <div className="px-8 py-4 bg-[#fcfaf7] border-b border-[#eeeeee]">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black/80">{group.mainCategory}</h4>
                                    </div>
                                    {group.subCategories.length === 0 ? (
                                        <div className="px-8 py-8 text-center text-[10px] uppercase tracking-widest text-black/20 italic">
                                            No sub-categories yet
                                        </div>
                                    ) : (
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-[#eeeeee] bg-[#fcfaf7]/50">
                                                    <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Sub-Category</th>
                                                    <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Slug</th>
                                                    <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#eeeeee]">
                                                {group.subCategories.map((cat) => (
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
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 p-6 bg-[#fcfaf7] border border-[#eeeeee] rounded-sm">
                    <div className="flex gap-4 items-start">
                        <span className="material-symbols-outlined text-[#bd870a] text-lg mt-0.5">info</span>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Hierarchical Categories</p>
                            <p className="text-[9px] uppercase tracking-widest text-black/40 leading-relaxed">
                                Categories are organized by main category. Women Wear includes default sub-categories (Bridal Edit, Wedding Edit, Formal Edit) that are auto-created if missing. All categories are fully editable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
