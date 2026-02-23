"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/db";

interface CategorySectionProps {
    title: string;
    products: Product[];
    buttonText?: string;
    theme?: "light" | "cream";
    showViewAll?: boolean;
    link?: string;
}

export default function CategorySection({
    title,
    products,
    buttonText = "View All",
    theme = "light",
    showViewAll = true,
    link = "/"
}: CategorySectionProps) {
    return (
        <section className={`py-8 md:py-10 px-6 md:px-12 ${theme === "cream" ? "bg-cream-light" : "bg-white"}`}>
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-8 md:mb-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal uppercase tracking-[0.1em]"
                    >
                        {title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 mb-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            src={product.images[0] || "/images/placeholder.png"}
                            secondarySrc={product.images[1]}
                            title={product.title}
                            slug={product.slug}
                            index={index}
                        />
                    ))}
                </div>

                {showViewAll && (
                    <div className="flex justify-center mt-8">
                        <Link href={link}>
                            <button className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-serif font-medium text-charcoal border border-[#f3c06f] bg-transparent hover:border-[#bd870a] hover:text-black transition-all px-10 py-3 rounded-sm min-w-[160px]">
                                {buttonText}
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
