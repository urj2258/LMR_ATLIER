"use client";

import { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/db";

interface CollectionRowProps {
    title: string;
    products: Product[];
    categorySlug?: string;
}

export default function CollectionRow({ title, products, categorySlug }: CollectionRowProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check scroll position to show/hide arrows
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, [products]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });

            // Update button states after scroll
            setTimeout(checkScrollPosition, 300);
        }
    };

    if (products.length === 0) return null;

    return (
        <div className="mb-16">
            {/* Collection Title */}
            <div className="mb-8 text-center">
                <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-gray-900 mb-2">
                    {title}
                </h3>
                <div className="w-8 h-[1px] bg-[#bd870a] mx-auto mt-4"></div>
            </div>

            {/* Scrollable Products Container */}
            <div className="relative group">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Products Row */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollPosition}
                    className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-6 md:px-12"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[calc((100%-4.5rem)/4)]"
                        >
                            <ProductCard
                                src={product.images[0]}
                                secondarySrc={product.images[1]}
                                title={product.title}
                                slug={product.slug}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* Fade Edges (Mobile Scroll Hints) */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 md:hidden group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-0 md:hidden group-hover:opacity-100 transition-opacity"></div>


                {/* Right Arrow */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
