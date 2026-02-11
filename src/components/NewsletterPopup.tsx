"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check localStorage
        const isClosed = localStorage.getItem("newsletter_closed");
        const isSubscribed = localStorage.getItem("newsletter_subscribed");

        if (!isClosed && !isSubscribed) {
            // Show after 4 seconds
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Save closed state (valid for session or permanent depending on req, strictly following 'closed=true')
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

                setIsSubmitted(true);
                localStorage.setItem("newsletter_subscribed", "true"); // Still keep local logic for UX

                setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
            } catch (error) {
                console.error('Subscription failed:', error);
            }
        }
    };

    if (!isVisible || pathname?.startsWith('/admin')) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-opacity duration-500">
            <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-black transition-colors"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Image Section */}
                <div className="hidden md:block w-1/2 relative min-h-[500px]">
                    <Image
                        src="/images/placeholders/bridal_1_1.png" // Using a high-quality existing image
                        alt="LMR Atelier Luxury"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center text-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4">Join the Atelier</span>

                    {!isSubmitted ? (
                        <>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#181611] mb-4 leading-tight">
                                Unlock 10% Off <br /> Your First Order
                            </h2>
                            <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
                                Subscribe to receive exclusive updates, early access to new collections, and bespoke offers.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border-b border-gray-300 py-3 text-center text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-400 font-light"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-b border-gray-300 py-3 text-center text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-400 font-light"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#181611] text-white py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#bd870a] transition-colors mt-4"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[10px] text-gray-400 mt-6 font-light">
                                By signing up, you agree to our Privacy Policy.
                            </p>
                        </>
                    ) : (
                        <div className="py-10 animate-in fade-in duration-500">
                            <h3 className="font-serif text-2xl text-[#181611] mb-2">Welcome to LMR</h3>
                            <p className="text-gray-500 text-sm font-light">You have successfully subscribed.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
