"use client";

import { useState, useEffect } from "react";
import ProductTable from "@/components/admin/ProductTable";
import Link from "next/link";
import { adminFetch, subscribeToCache } from "@/utils/adminFetcher";

export default function ProductsClient() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const prodUrl = '/api/products';
        const catUrl = '/api/categories';

        // Subscribe to products
        const unsubProd = subscribeToCache(prodUrl, (data) => {
            setProducts(data);
            if (categories.length > 0) setIsLoading(false);
        });

        // Subscribe to categories
        const unsubCat = subscribeToCache(catUrl, (data) => {
            setCategories(data);
            if (products.length > 0) setIsLoading(false);
        });

        adminFetch(prodUrl);
        adminFetch(catUrl);

        return () => {
            unsubProd();
            unsubCat();
        };
    }, [products.length, categories.length]);

    return (
        <>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <nav className="text-[10px] uppercase tracking-widest text-black/40 mb-2">
                        Portal / Imagery
                    </nav>
                    <h1 className="text-2xl md:text-3xl font-serif font-light tracking-tight">Manage Products</h1>
                </div>
                <Link
                    href="/admin/products/add"
                    className="w-full md:w-auto bg-[#121212] text-white px-8 py-4 md:py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-2 rounded-sm"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Product
                </Link>
            </header>


            <ProductTable
                initialProducts={products}
                initialCategories={categories}
                isLoading={isLoading}
            />
        </>
    );
}
