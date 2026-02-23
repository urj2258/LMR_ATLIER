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
            }, 4000);
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-[900px] bg-white flex">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-[20px] right-[20px] z-10 w-[30px] h-[30px] flex items-center justify-center text-[#666] hover:text-black transition-colors"
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="2" y1="2" x2="18" y2="18" />
                        <line x1="18" y1="2" x2="2" y2="18" />
                    </svg>
                </button>

                {/* Image Section - Left */}
                <div className="hidden md:block w-[450px] relative">
                    <Image
                        src="/images/placeholders/bridal_1_1.png"
                        alt="LMR ATELIER"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Section - Right */}
                <div className="w-full md:w-[450px] bg-white px-[60px] py-[80px] flex flex-col justify-center">

                    {/* Logo/Brand */}
                    <div className="text-center mb-[30px]">
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-serif tracking-[0.15em] text-black uppercase text-[32px] leading-none">LMR</span>
                            <span className="font-sans tracking-[0.4em] text-[#C9A961] uppercase text-[11px] mt-[2px]">ATELIER</span>
                        </div>
                    </div>


                    {/* Heading */}
                    <h2 className="text-[28px] font-normal text-black text-center mb-[15px]" style={{ fontFamily: 'serif', lineHeight: '1.3' }}>
                        Signup for newsletter
                    </h2>

                    {/* Subtext */}
                    <p className="text-[14px] text-[#666] text-center mb-[35px]" style={{ lineHeight: '1.6' }}>
                        Stay up to date with latest collections<br />and news from LMR ATELIER
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-[15px]">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-[45px] px-[15px] text-[14px] text-black border border-[#ddd] outline-none focus:border-[#999] transition-colors"
                                style={{ fontFamily: 'sans-serif' }}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[45px] px-[15px] text-[14px] text-black border border-[#ddd] outline-none focus:border-[#999] transition-colors"
                                style={{ fontFamily: 'sans-serif' }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[45px] bg-black text-white text-[14px] font-medium hover:bg-[#333] transition-colors"
                            style={{ fontFamily: 'sans-serif' }}
                        >
                            Subscribe now
                        </button>
                    </form>

                    {/* Footer Disclaimer */}
                    <p className="text-[11px] text-[#999] text-center mt-[25px]" style={{ lineHeight: '1.5' }}>
                        You are signing up to receive communication via email and can unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
