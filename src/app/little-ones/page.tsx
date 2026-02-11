
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function LittleOnes() {
    const kidsProducts = await getProductsByCategory('Little Ones');

    return (
        <div className="pt-8">
            {/* Headline Section */}
            <div className="max-w-7xl mx-auto px-4 pb-4">
                <h1 className="font-serif text-[#181611] tracking-[0.2em] text-[42px] md:text-[64px] font-extralight leading-tight text-center uppercase">
                    Little Ones
                </h1>
                <div className="w-16 h-[1px] bg-[#bd870a] mx-auto mt-6"></div>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-400 text-center max-w-lg mx-auto">Heritage miniatures for the smallest stars.</p>
            </div>

            {/* Collection Grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 pb-20 pt-16">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {kidsProducts.map((product, index) => (
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
            </div>
        </div>
    );
}
