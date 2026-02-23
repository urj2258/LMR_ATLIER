"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
    src: string;
    secondarySrc?: string;
    title: string;
    index: number;
    aspectRatio?: string;
    slug?: string;
}

export default function ProductCard({
    src,
    secondarySrc,
    title,
    index,
    aspectRatio = "aspect-[3/4]",
    slug = ""
}: ProductCardProps) {
    // Generate slug from title if not provided
    const productSlug = slug || title.toLowerCase().replace(/[^a-z0-{}-]+/g, '-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group flex flex-col"
        >
            <Link href={`/product/${productSlug}`} className="block relative overflow-hidden mb-4 md:mb-5">
                <div className={`${aspectRatio} bg-gray-50 dark:bg-zinc-900 overflow-hidden`}>
                    {/* Primary Image */}
                    <Image
                        src={src}
                        alt={title}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${secondarySrc ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                            }`}
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        loading="lazy"
                    />

                    {/* Secondary Image (Hover Effect - Desktop Only) */}
                    {secondarySrc && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out hidden lg:block">
                            <Image
                                src={secondarySrc}
                                alt={`${title} - Detail`}
                                fill
                                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out"
                                sizes="33vw"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </Link>

            <div className="text-center px-2">
                <Link href={`/product/${productSlug}`} className="block">
                    <h3 className="font-serif text-base md:text-lg font-medium mb-2 md:mb-3 text-[#181611] uppercase tracking-wider hover:text-[#C6A43B] transition-colors line-clamp-2 md:line-clamp-1">{title}</h3>
                </Link>
                <a
                    href={`https://wa.me/923288652263?text=${encodeURIComponent(`Hi, I am interested in ${title}.\nReference Image: ${src}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#C6A43B] hover:bg-[#b59535] text-white py-3.5 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded shadow-sm hover:shadow-md"
                >
                    Price on Request
                </a>
            </div>

        </motion.div>
    );
}
