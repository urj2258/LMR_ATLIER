
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function FormalEdit() {
    const formalProducts = await getProductsByCategory('Formal');

    return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-10 pt-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-2 text-[11px] uppercase tracking-widest text-[#181611]/60">
                <Link className="hover:text-[#bd870a] transition-colors" href="/">Home</Link>
                <span>/</span>
                <span className="text-[#181611] font-bold">Formal Edit</span>
            </nav>

            {/* Page Heading */}
            <div className="text-center mb-16 space-y-2">
                <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-[#181611]">Formal Edit</h2>
                <p className="text-[#181611]/60 text-sm tracking-[0.2em] uppercase">Luxury Party Wear Collection</p>
                <div className="w-12 h-[1px] bg-[#bd870a] mx-auto mt-4"></div>
            </div>

            {/* 3-Column Editorial Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                {formalProducts.map((product, index) => (
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
    );
}
