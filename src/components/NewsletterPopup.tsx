"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const isClosed = localStorage.getItem("newsletter_closed");
        const isSubscribed = localStorage.getItem("newsletter_subscribed");

        if (!isClosed && !isSubscribed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("newsletter_closed", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && name) {
            try {
                await fetch('/api/subscribers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email }),
                });

                localStorage.setItem("newsletter_subscribed", "true");
                setTimeout(() => {
                    setIsVisible(false);
                }, 2000);
            } catch (error) {
                console.error('Subscription failed:', error);
            }
        }
    };

    if (!isVisible || pathname?.startsWith('/admin')) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-[900px] bg-white flex flex-col md:flex-row shadow-2xl overflow-hidden rounded-sm">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                    aria-label="Close"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                {/* Image Section - Left (Hidden on small mobile) */}
                <div className="hidden md:block w-1/2 relative bg-gray-50 min-h-[400px]">
                    <Image
                        src="/images/placeholders/bridal_1_1.png"
                        alt="LMR ATELIER"
                        fill
                        className="object-cover"
                        priority
                        sizes="450px"
                    />
                </div>

                {/* Content Section - Right (Full width on mobile) */}
                <div className="w-full md:w-1/2 bg-white px-8 py-12 md:px-14 md:py-20 flex flex-col justify-center">

                    {/* Brand */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center justify-center scale-90 md:scale-100">
                            <span className="font-serif tracking-[0.2em] text-black uppercase text-2xl md:text-3xl leading-none">LMR</span>
                            <span className="font-sans tracking-[0.5em] text-[#C9A961] uppercase text-[9px] md:text-[11px] mt-1 font-bold">ATELIER</span>
                        </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif text-black text-center mb-4 leading-tight">
                        Our Newsletter
                    </h2>

                    <p className="text-[13px] md:text-sm text-gray-500 text-center mb-8 leading-relaxed max-w-xs mx-auto">
                        Be the first to discover our latest collections and exclusive updates from LMR ATELIER.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-12 px-4 text-sm text-black border border-gray-200 outline-none focus:border-gold-champagne transition-colors bg-gray-50/50"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 text-sm text-black border border-gray-200 outline-none focus:border-gold-champagne transition-colors bg-gray-50/50"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98]"
                        >
                            Enlist Now
                        </button>
                    </form>

                    <p className="text-[10px] text-gray-400 text-center mt-8 leading-relaxed px-4">
                        By subscribing, you agree to receive communications from LMR ATELIER. You can opt-out at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}

