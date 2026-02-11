"use client";

import Link from "next/link";

export default function CartPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
            <h1 className="text-4xl font-serif mb-8">Your Cart</h1>
            <p className="text-charcoal/60 mb-12 italic">Your shopping bag is currently empty.</p>
            <Link
                href="/"
                className="inline-block bg-charcoal text-white px-8 py-3 uppercase tracking-widest text-[11px] font-bold hover:bg-black transition-all"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
