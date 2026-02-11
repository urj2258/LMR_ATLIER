
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/utils/db";

interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
}

interface ProductTableProps {
    initialProducts: Product[];
    initialCategories?: Category[];
    isLoading?: boolean;
}

export default function ProductTable({ initialProducts, initialCategories = [], isLoading = false }: ProductTableProps) {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All Collections");
    const router = useRouter();

    // Update internal products state when initialProducts changes
    // But since we are moving to client-side only, the parent will pass data when ready
    useState(() => {
        if (initialProducts.length > 0) setProducts(initialProducts);
    });

    // Use a useEffect to sync products if initialProducts changes (e.g. after fetch)
    const [lastInitialProducts, setLastInitialProducts] = useState(initialProducts);
    if (initialProducts !== lastInitialProducts) {
        setProducts(initialProducts);
        setLastInitialProducts(initialProducts);
    }

    // 1. Category extraction (Source of Truth: initialCategories, Fallback: unique categories from products)
    const categoriesList = initialCategories.length > 0
        ? ["All Collections", ...initialCategories.map(c => c.name)]
        : ["All Collections", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All Collections" || product.category === filter;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        // 1. Optimistic Update
        const previousProducts = [...products];
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);

        // Update global cache so other components see it
        const { updateCache, invalidateCache } = await import("@/utils/adminFetcher");
        updateCache('/api/products', updatedProducts);
        invalidateCache('/api/admin/stats'); // Force dashboard to refresh count

        try {
            const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            if (!res.ok) {
                // Rollback if failed
                setProducts(previousProducts);
                updateCache('/api/products', previousProducts);
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
            setProducts(previousProducts);
            updateCache('/api/products', previousProducts);
            alert("Error deleting product");
        }
    };

    const LoadingRow = () => (
        <tr className="animate-pulse">
            <td className="px-8 py-4"><div className="w-16 h-20 bg-gray-100"></div></td>
            <td className="px-8 py-4"><div className="h-4 w-48 bg-gray-100 mb-2"></div><div className="h-3 w-32 bg-gray-50"></div></td>
            <td className="px-8 py-4"><div className="h-6 w-24 bg-gray-100"></div></td>
            <td className="px-8 py-4"><div className="h-4 w-12 bg-gray-100 ml-auto"></div></td>
        </tr>
    );

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#eeeeee]">
            <div className="size-16 bg-[#fcfaf7] rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black/20 text-3xl">inventory_2</span>
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 font-serif">No products found</h3>
            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-8 max-w-xs text-center leading-relaxed">
                {filter === "All Collections"
                    ? "Your catalogue is currently empty. Start by adding your first masterpiece."
                    : `We couldn't find any products in the "${filter}" collection.`}
            </p>
            {filter !== "All Collections" && (
                <button
                    onClick={() => { setFilter("All Collections"); setSearch(""); }}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#bd870a] hover:underline"
                >
                    Clear all filters
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* Professional Search & Status Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="relative w-full md:w-96 group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/30 text-lg group-focus-within:text-[#bd870a] transition-colors">search</span>
                    <input
                        className="w-full pl-12 pr-4 py-3 bg-white border border-[#eeeeee] text-[11px] uppercase tracking-widest focus:ring-0 focus:border-[#bd870a] placeholder:text-black/20 outline-none transition-all shadow-sm"
                        placeholder="Search product catalogue..."
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {!isLoading && (
                    <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium">
                        <span className="text-black font-bold">{filteredProducts.length}</span> Results <span className="mx-2 text-black/10">|</span> Total Items: {products.length}
                    </div>
                )}
            </div>

            {/* Dynamic Category Tabs */}
            <div className="border-b border-[#eeeeee] mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-10 min-w-max">
                    {categoriesList.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`pb-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative ${filter === cat
                                ? 'text-[#bd870a]'
                                : 'text-black/30 hover:text-black/60'
                                }`}
                        >
                            {cat}
                            {filter === cat && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#bd870a]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#eeeeee] bg-[#fcfaf7]/50">
                            <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 w-24">Preview</th>
                            <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Product Details</th>
                            <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Category</th>
                            <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eeeeee]">
                        {isLoading ? (
                            <>
                                <LoadingRow />
                                <LoadingRow />
                                <LoadingRow />
                            </>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={4}>
                                    <EmptyState />
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-[#fcfaf7]/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="w-16 h-20 bg-[#e9e4d9] overflow-hidden relative shadow-sm border border-black/5">
                                            {product.images?.[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-black/20">No Img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-[#bd870a] transition-colors">{product.title}</p>
                                        <p className="text-[10px] text-black/40 italic truncate max-w-xs font-medium tracking-tight">{product.slug}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[9px] uppercase tracking-widest px-3 py-1 font-bold border border-[#bd870a]/20 text-[#bd870a] bg-[#bd870a]/5 shadow-inner">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-6">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-[10px] uppercase tracking-widest font-bold text-[#cc3333]/40 hover:text-[#cc3333] transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
