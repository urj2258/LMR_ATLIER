import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsBySubcategory } from "@/utils/db";

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        subcategory: string;
    }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
    const { subcategory } = await params;


    // Decode URL slug and capitalize for display
    const subcategoryName = decodeURIComponent(subcategory)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Fetch products for this subcategory under Wedding Edit
    const products = await getProductsBySubcategory('Wedding Edit', subcategoryName);

    return (
        <div className="pt-8">
            <section className="max-w-[1440px] mx-auto text-center px-8 mb-16">
                {/* Breadcrumbs */}
                <nav className="mb-6 flex justify-center items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    <Link className="hover:text-[#bd870a]" href="/">Home</Link>
                    <span>/</span>
                    <Link className="hover:text-[#bd870a]" href="/wedding-edit">Wedding Edit</Link>
                    <span>/</span>
                    <span className="text-gray-900">{subcategoryName}</span>
                </nav>

                <h2 className="text-5xl md:text-6xl font-serif tracking-tight mb-2">{subcategoryName}</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">Wedding Edit Collection</p>
                <div className="w-12 h-[1px] bg-[#bd870a] mx-auto mt-8"></div>
            </section>

            <section className="pb-24 px-8 md:px-20 max-w-[1440px] mx-auto">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No products found in this collection</p>
                        <Link href="/wedding-edit" className="text-[#bd870a] hover:underline mt-4 inline-block">
                            ← Back to Wedding Edit
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                src={product.images[0]}
                                secondarySrc={product.images[1] || product.images[0]}
                                title={product.title}
                                index={index}
                                slug={product.slug}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
