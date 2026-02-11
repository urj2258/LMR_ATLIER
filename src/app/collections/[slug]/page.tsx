
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
    params: {
        slug: string;
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = params;

    // 1. Fetch categories to find the metadata for this slug
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    // 2. Fetch products for this category name
    const products = await getProductsByCategory(category.name);

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-8 mt-24">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 py-8 text-[11px] uppercase tracking-widest text-gray-400 font-medium">
                <Link className="hover:text-gold-champagne transition-colors" href="/">Home</Link>
                <span className="text-[10px] opacity-50">/</span>
                <span className="text-charcoal font-bold">{category.name}</span>
            </div>

            {/* Collection Heading */}
            <div className="text-center mb-16">
                <h2 className="font-serif text-5xl md:text-6xl text-[#181611] mb-6 tracking-tight">{category.name}</h2>
                <div className="w-12 h-[1px] bg-gold-champagne mx-auto"></div>
            </div>

            {/* Editorial Grid */}
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 italic">Coming Soon...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            src={product.images[0]}
                            secondarySrc={product.images[1]}
                            title={product.title}
                            slug={product.slug}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
