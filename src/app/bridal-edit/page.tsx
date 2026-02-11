
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function BridalEdit() {
    const bridalProducts = await getProductsByCategory('Bridal');

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 py-8 text-[11px] uppercase tracking-widest text-gray-400 font-medium">
                <Link className="hover:text-[#5c2331] transition-colors" href="/">Home</Link>
                <span className="text-[10px] opacity-50">/</span>
                <span className="text-[#5c2331] font-bold">Bridal Edit</span>
            </div>

            {/* Collection Heading */}
            <div className="text-center mb-16">
                <h2 className="font-serif text-5xl md:text-6xl text-[#181611] mb-4">Bridal Edit</h2>
                <div className="w-12 h-[1px] bg-[#C6A43B] mx-auto"></div>
            </div>

            {/* 3-Column Editorial Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                {bridalProducts.map((product, index) => (
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
        </div>
    );
}
