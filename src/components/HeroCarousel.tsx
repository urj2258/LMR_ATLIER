"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        image: "/images/hero_1.png",
        title: "حویلی",
        subtitle: "HAVELI COLLECTION",
    },
    {
        id: 2,
        image: "/images/hero_2.png",
        title: "میراث",
        subtitle: "A LEGACY OF COUTURE",
    },
    {
        id: 3,
        image: "/images/hero_3.png",
        title: "نورِ کائنات",
        subtitle: "THE RADIANCE OF EXCELLENCE",
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[65vh] md:h-[75vh] lg:h-[80vh] w-full overflow-hidden bg-charcoal">
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12">

                {/* Bottom-Centered Luxury Content Group (Removed Headings) */}
                <div className="mx-auto text-center mb-16 md:mb-24 relative flex flex-col items-center max-w-5xl">
                    {/* Headings removed per user request */}
                </div>

                {/* Bottom-Left Independently Anchored CTA (Scaled Down) */}
                <motion.div
                    key={`cta-${current}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 md:bottom-16 left-6 md:left-12 z-20"
                >
                    <Link
                        href="https://wa.me/923288652263?text=I'd like to book an appointment."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-3 text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-medium transition-all backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.08]"
                    >
                        Book an Appointment
                    </Link>
                </motion.div>

            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === current ? "bg-white w-6" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
