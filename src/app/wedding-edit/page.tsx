
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function WeddingEdit() {
    const weddingProducts = await getProductsByCategory('Wedding');

    return (
        <div className="pt-8">
            <section className="max-w-[1440px] mx-auto px-8 md:px-20 text-center mb-16">
                <nav className="mb-6 flex justify-center items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    <Link className="hover:text-[#bd870a]" href="/">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900">Wedding Edit</span>
                </nav>
                <h2 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight">Wedding Edit</h2>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    A curated collection of heritage ensembles for the modern Pakistani couple, featuring intricate craftsmanship and timeless luxury.
                </p>
            </section>

            <section className="pb-24 px-8 md:px-20 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    {weddingProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            src={product.images[0]}
                            secondarySrc={product.images[1] || product.images[0]} // Use 2nd image or fallback
                            title={product.title}
                            index={index}
                            slug={product.slug}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
