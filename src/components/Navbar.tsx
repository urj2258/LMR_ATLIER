"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/utils/db";

interface Category {
    id: string;
    name: string;
    slug: string;
    mainCategory?: string;
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isWomenWearOpen, setIsWomenWearOpen] = useState(false); // For mobile accordion
    const [isMenswearOpen, setIsMenswearOpen] = useState(false); // For mobile accordion
    const [isLittleOnesOpen, setIsLittleOnesOpen] = useState(false); // For mobile accordion
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsWomenWearOpen(false);
        setIsMenswearOpen(false);
        setIsLittleOnesOpen(false);
    }, [pathname]);

    // Fetch categories for dynamic menu
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch all products for search
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products for search:", error);
            }
        };
        fetchProducts();
    }, [isSearchOpen]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter categories by mainCategory field
    const womenWearCategories = categories.filter(c => c.mainCategory === 'Women Wear');
    const menswearCategories = categories.filter(c => c.mainCategory === 'Menswear');
    const littleOnesCategories = categories.filter(c => c.mainCategory === 'Little Ones');

    // Helper to get correct link for a category
    const getCategoryLink = (cat: { name: string, slug: string }) => {
        return `/collections/${cat.slug}`;
    };

    const isWomenActive = pathname === '/bridal-edit' || pathname === '/wedding-edit' || pathname === '/formal-edit' || pathname.startsWith('/collections/');

    return (
        <header className="fixed top-0 w-full z-50">
            {/* Announcement Bar */}
            <motion.div
                initial={false}
                animate={{ height: isScrolled ? 0 : "auto", opacity: isScrolled ? 0 : 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full bg-black text-white text-center overflow-hidden relative z-[60]"
            >
                <div className="py-2.5 flex items-center justify-center">
                    <p className="font-sans text-[11px] md:text-xs font-medium tracking-wide gold-shimmer-text inline-block px-4 whitespace-nowrap">
                        Share your design — we custom make it for you.
                    </p>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes goldShimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .gold-shimmer-text {
                    background: linear-gradient(90deg, #ffffff 0%, #ffffff 40%, #f3c06f 50%, #ffffff 60%, #ffffff 100%);
                    background-size: 200% auto;
                    color: transparent;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: goldShimmer 3s ease-in-out infinite;
                }
            `}</style>

            {/* Main Navbar */}
            <div className={`w-full bg-white/95 backdrop-blur-md border-b border-black/5 transition-all duration-500 relative z-50 ${isScrolled ? "py-2" : "py-4"}`}>
                <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12">
                    {/* Left: Logo */}
                    <Link href="/" className="flex flex-col items-start px-2 relative z-50">
                        <span className={`font-serif tracking-[0.2em] leading-tight text-charcoal uppercase transition-all duration-500 ${isScrolled ? "text-lg md:text-xl" : "text-xl md:text-3xl"}`}>
                            LMR
                        </span>
                        <span className={`font-sans tracking-[0.5em] text-gold-champagne uppercase ml-1 font-bold transition-all duration-500 ${isScrolled ? "text-[6px] md:text-[7px] -mt-1" : "text-[7px] md:text-[9px] -mt-1"}`}>
                            ATELIER
                        </span>
                    </Link>

                    <div className="flex items-center gap-12">
                        {/* Navigation Links - Desktop */}
                        <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
                            <Link href="/" className={`${pathname === '/' ? 'text-gold-champagne font-bold' : 'text-charcoal/80'} hover:text-gold-champagne transition-colors`}>Home</Link>

                            {/* Women Wear Dropdown */}
                            <div className="group relative py-4">
                                <Link
                                    href="/bridal-edit"
                                    className={`flex items-center gap-1.5 hover:text-gold-champagne transition-colors uppercase tracking-[0.2em] outline-none ${isWomenActive ? 'text-gold-champagne font-bold' : 'text-charcoal/80'}`}
                                >
                                    Women Wear
                                    <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                                </Link>

                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] pt-4">
                                    <div className="bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5 py-4 z-[70]">
                                        {womenWearCategories.length > 0 ? (
                                            womenWearCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === getCategoryLink(cat) ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <>
                                                <Link href="/bridal-edit" className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === '/bridal-edit' ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}>Bridal Edit</Link>
                                                <Link href="/wedding-edit" className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === '/wedding-edit' ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}>Wedding Edit</Link>
                                                <Link href="/formal-edit" className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === '/formal-edit' ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}>Formal Edit</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Menswear Dropdown */}
                            <div className="group relative py-4">
                                <Link
                                    href="/menswear"
                                    className={`flex items-center gap-1.5 hover:text-gold-champagne transition-colors uppercase tracking-[0.2em] outline-none ${pathname === '/menswear' || pathname.startsWith('/collections/') && menswearCategories.some(c => pathname.includes(c.slug)) ? 'text-gold-champagne font-bold' : 'text-charcoal/80'}`}
                                >
                                    Menswear
                                    {menswearCategories.length > 0 && (
                                        <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                                    )}
                                </Link>

                                {menswearCategories.length > 0 && (
                                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] pt-4">
                                        <div className="bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5 py-4 z-[70]">
                                            {menswearCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === getCategoryLink(cat) ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Little Ones Dropdown */}
                            <div className="group relative py-4">
                                <Link
                                    href="/little-ones"
                                    className={`flex items-center gap-1.5 hover:text-gold-champagne transition-colors uppercase tracking-[0.2em] outline-none ${pathname === '/little-ones' || pathname.startsWith('/collections/') && littleOnesCategories.some(c => pathname.includes(c.slug)) ? 'text-gold-champagne font-bold' : 'text-charcoal/80'}`}
                                >
                                    Little Ones
                                    {littleOnesCategories.length > 0 && (
                                        <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                                    )}
                                </Link>

                                {littleOnesCategories.length > 0 && (
                                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] pt-4">
                                        <div className="bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5 py-4 z-[70]">
                                            {littleOnesCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className={`block px-6 py-2.5 text-[10px] tracking-[0.15em] hover:text-gold-champagne hover:bg-black/[0.02] transition-all ${pathname === getCategoryLink(cat) ? 'text-gold-champagne bg-black/[0.01]' : 'text-charcoal'}`}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Utilities */}
                        <div className="flex items-center gap-6 relative z-50">
                            {/* Book an Appointment - Desktop */}
                            <Link
                                href="https://wa.me/923288652263?text=I'd like to book an appointment."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:flex items-center gap-2 bg-charcoal hover:bg-black text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-sm"
                            >
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Book an Appointment
                            </Link>

                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-charcoal hover:text-gold-champagne transition-colors pt-1"
                                aria-label="Open search"
                            >
                                <span className="material-symbols-outlined text-xl">search</span>
                            </button>

                            <Link
                                href="/admin/login"
                                className="text-charcoal hover:text-gold-champagne transition-colors pt-1 hidden md:block"
                                aria-label="Admin login"
                            >
                                <span className="material-symbols-outlined text-xl">person</span>
                            </Link>

                            <Link
                                href="/cart"
                                className="text-charcoal hover:text-gold-champagne transition-colors pt-1 relative"
                                aria-label="View cart"
                            >
                                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                                <span className="absolute -top-1 -right-1 bg-gold-champagne text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">0</span>
                            </Link>

                            <button
                                className="lg:hidden text-charcoal flex items-center justify-center w-10 h-10"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <span className="material-symbols-outlined text-2xl">
                                    {isMobileMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between px-6 py-6 border-b border-black/5">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-start px-2">
                                <span className="font-serif tracking-[0.2em] leading-tight text-charcoal uppercase text-xl">
                                    LMR
                                </span>
                                <span className="font-sans tracking-[0.5em] text-gold-champagne uppercase ml-1 font-bold text-[7px] -mt-1">
                                    ATELIER
                                </span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-charcoal"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            <nav className="flex flex-col gap-6">
                                <Link
                                    href="/"
                                    className={`text-lg uppercase tracking-[0.2em] font-bold ${pathname === '/' ? 'text-gold-champagne' : 'text-charcoal'}`}
                                >
                                    Home
                                </Link>


                                {/* Women Wear Accordion */}
                                <div className="w-full">
                                    <button
                                        onClick={() => setIsWomenWearOpen(!isWomenWearOpen)}
                                        className="w-full flex justify-between items-center text-sm uppercase tracking-[0.2em] font-bold text-charcoal py-2 border-b border-black/5 outline-none"
                                    >
                                        Women Wear
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${isWomenWearOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 pl-4 ${isWomenWearOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                        {womenWearCategories.length > 0 ? (
                                            womenWearCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <>
                                                <Link href="/bridal-edit" className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne">Bridal Edit</Link>
                                                <Link href="/wedding-edit" className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne">Wedding Edit</Link>
                                                <Link href="/formal-edit" className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne">Formal Edit</Link>
                                            </>
                                        )}
                                    </div>
                                </div>


                                {/* Menswear Accordion */}
                                <div className="w-full">
                                    <button
                                        onClick={() => setIsMenswearOpen(!isMenswearOpen)}
                                        className="w-full flex justify-between items-center text-sm uppercase tracking-[0.2em] font-bold text-charcoal py-2 border-b border-black/5 outline-none"
                                    >
                                        Menswear
                                        {menswearCategories.length > 0 && (
                                            <span className={`material-symbols-outlined transition-transform duration-300 ${isMenswearOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                        )}
                                    </button>

                                    {menswearCategories.length > 0 && (
                                        <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 pl-4 ${isMenswearOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                            {menswearCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Little Ones Accordion */}
                                <div className="w-full">
                                    <button
                                        onClick={() => setIsLittleOnesOpen(!isLittleOnesOpen)}
                                        className="w-full flex justify-between items-center text-sm uppercase tracking-[0.2em] font-bold text-charcoal py-2 border-b border-black/5 outline-none"
                                    >
                                        Little Ones
                                        {littleOnesCategories.length > 0 && (
                                            <span className={`material-symbols-outlined transition-transform duration-300 ${isLittleOnesOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                        )}
                                    </button>

                                    {littleOnesCategories.length > 0 && (
                                        <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 pl-4 ${isLittleOnesOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                            {littleOnesCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryLink(cat)}
                                                    className="text-[11px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-gold-champagne"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="https://wa.me/923288652263?text=I'd like to book an appointment."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm uppercase tracking-[0.2em] font-bold text-gold-champagne py-2 border-b border-black/5 w-full flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    Book an Appointment
                                </Link>
                            </nav>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="p-6 border-t border-black/5 bg-gray-50/50">
                            <Link
                                href="/admin/login"
                                className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-charcoal mb-6"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined">person</span>
                                Member Login
                            </Link>
                            <p className="text-[10px] text-charcoal/40 uppercase tracking-widest text-center">
                                &copy; {new Date().getFullYear()} LMR Atelier. All Rights Reserved.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 bg-white/98 z-[100]"
                    >
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                            <div className="flex justify-end mb-20">
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-charcoal hover:rotate-90 transition-transform duration-300"
                                >
                                    <span className="material-symbols-outlined text-3xl">close</span>
                                </button>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-charcoal/40 mb-8">What are you looking for?</h2>
                                <div className="relative border-b-2 border-black/10 focus-within:border-black transition-colors duration-500">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full bg-transparent py-4 text-2xl md:text-4xl font-serif outline-none placeholder:text-black/5"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="absolute right-0 top-1/2 -translate-y-1/2">
                                        <span className="material-symbols-outlined text-3xl">search</span>
                                    </button>
                                </div>

                                {/* Search Results */}
                                {searchQuery && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-12 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-black/10 pr-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {products
                                                .filter(p =>
                                                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map(product => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/product/${product.slug}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="group flex gap-4 items-start pb-6 border-b border-black/5"
                                                    >
                                                        <div className="w-20 aspect-[3/4] relative bg-gray-100 overflow-hidden">
                                                            <Image
                                                                src={product.images[0]}
                                                                alt={product.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-serif mb-1">{product.title}</h3>
                                                            <p className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-2">{product.category}</p>
                                                            <p className="text-[10px] font-bold text-gold-champagne">{product.price}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                        {products.filter(p =>
                                            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            p.category.toLowerCase().includes(searchQuery.toLowerCase())
                                        ).length === 0 && (
                                                <div className="py-20 text-center">
                                                    <p className="font-serif italic text-charcoal/40 text-lg">No products found matching &quot;{searchQuery}&quot;</p>
                                                </div>
                                            )}
                                    </motion.div>
                                )}

                                <div className="mt-20">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/30 mb-6" > Popular Searches</p>
                                    <div className="flex flex-wrap gap-4">
                                        {['Bridal', 'Formal', 'Menswear', 'Latest'].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setSearchQuery(tag)}
                                                className="px-6 py-2 border border-black/5 rounded-full text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
