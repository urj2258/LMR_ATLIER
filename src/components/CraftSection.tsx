"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CraftSection() {
    return (
        <section className="py-16 md:py-32 px-6 md:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-serif italic text-charcoal mb-6 md:mb-8">Our Craft</h2>
                    <div className="w-12 h-[1px] bg-gold-champagne mb-10" />

                    <div className="space-y-6 text-charcoal/80 leading-relaxed font-sans text-lg">
                        <p>
                            With over three decades of heritage, LMR ATELIER is a testament to the timeless art of handmade karhai. Every ensemble is a labor of love, meticulously brought to life by our master artisans whose skills have been passed down through generations.
                        </p>
                        <p>
                            Our commitment to excellence is reflected in the intricate hand-embroidery and the meticulous attention to detail that defines every stitch. We celebrate the soul of craftsmanship, merging traditional techniques with a contemporary aesthetic to create masterpieces that are as unique as the individuals who wear them.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl"
                >
                    <Image
                        src="/images/hero_3.png"
                        alt="Handcrafted Karhai Craftsmanship"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}
