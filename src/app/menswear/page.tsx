
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function Menswear() {
    const menswearProducts = await getProductsByCategory('Menswear');

    return (
        <div className="pt-8">
            <section className="max-w-[1440px] mx-auto text-center px-8 mb-16">
                <h2 className="text-5xl md:text-6xl font-serif tracking-tight mb-2">Menswear</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">The Art of Masculine Heritage</p>
                <div className="w-12 h-[1px] bg-[#bd870a] mx-auto mt-8"></div>
            </section>

            <section className="pb-24 px-8 md:px-20 max-w-[1440px] mx-auto">
                {/* Collection Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {menswearProducts.map((product, index) => (
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
            </section>
        </div>
    );
}
