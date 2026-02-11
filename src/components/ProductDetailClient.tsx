
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/utils/db";

export default function ProductDetailClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const { title, images, description, color, fabric, details, category } = product;

    // Inquiry State
    const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '', // Map to contact/email logic
        phone: '',
        message: ''
    });

    const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInquiryStatus('sending');

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: title,
                    productCategory: category,
                    customerName: formData.name,
                    customerContact: `${formData.email} | ${formData.phone}`,
                    message: formData.message
                })
            });

            if (res.ok) {
                setInquiryStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setInquiryStatus('error');
            }
        } catch (error) {
            setInquiryStatus('error');
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 bg-white selection:bg-[#fed7aa] selection:text-black">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-10 text-gray-400 text-[10px] uppercase tracking-widest font-medium">
                <Link className="hover:text-black transition-colors" href="/">Home</Link>
                <span className="opacity-50">/</span>
                <Link className="hover:text-black transition-colors" href={`/${category.toLowerCase().replace(' ', '-')}-edit`}>{category} Edit</Link>
                <span className="opacity-50">/</span>
                <span className="text-black font-bold">{title}</span>
            </nav>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                {/* Left Column: Gallery */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="aspect-[3/4.2] w-full bg-gray-50 overflow-hidden relative shadow-sm"
                    >
                        {images[selectedImage] && (
                            <Image
                                src={images[selectedImage]}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </motion.div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`flex-shrink-0 w-24 aspect-[4/5] bg-gray-50 border transition-all duration-300 ${selectedImage === i ? 'border-black opacity-100 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                                    } cursor-pointer overflow-hidden relative`}
                            >
                                <Image
                                    src={img}
                                    alt={`${title} Detail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Info & Form */}
                <div className="lg:col-span-5 flex flex-col">
                    <div className="sticky top-28">
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-3xl font-serif text-black mb-6 tracking-tight leading-tight">{title}</h1>

                            {/* WhatsApp Button */}
                            <a
                                href={`https://wa.me/923288652263?text=${encodeURIComponent(`Hi, I am interested in ${title}.\nReference Image: ${images[selectedImage]}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.397.015 12.03c0 2.12.553 4.189 1.603 6l-1.706 6.23 6.374-1.671a11.782 11.782 0 005.76 1.51h.005c6.636 0 12.032-5.396 12.035-12.032a11.762 11.762 0 00-3.483-8.503z" />
                                </svg>
                                Make an enquiry
                            </a>
                        </header>

                        <div className="space-y-6 text-gray-600 text-[13px] leading-relaxed mb-8 max-w-lg">
                            <p>{description}</p>
                            <p className="font-bold text-black uppercase tracking-widest text-[11px]">Color: <span className="font-normal text-gray-500 ml-1">{color}</span></p>
                            <p className="font-bold text-black uppercase tracking-widest text-[11px]">Fabric: <span className="font-normal text-gray-500 ml-1">{fabric}</span></p>
                        </div>

                        {/* Inquiry Form */}
                        <div className="mb-10">
                            {inquiryStatus === 'success' ? (
                                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded text-sm mb-4">
                                    Thank you! Your inquiry has been sent. We will contact you shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleInquirySubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-800">Full name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="w-full bg-white border border-gray-200 focus:border-black py-2.5 px-3 text-sm transition-colors outline-none"
                                                value={formData.name}
                                                onChange={handleInquiryChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-800">Your email <span className="text-red-500">*</span></label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="w-full bg-white border border-gray-200 focus:border-black py-2.5 px-3 text-sm transition-colors outline-none"
                                                value={formData.email}
                                                onChange={handleInquiryChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-800">Phone number <span className="text-red-500">*</span></label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            className="w-full bg-white border border-gray-200 focus:border-black py-2.5 px-3 text-sm transition-colors outline-none"
                                            value={formData.phone}
                                            onChange={handleInquiryChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-800">Share Your Message</label>
                                        <textarea
                                            id="message"
                                            className="w-full bg-white border border-gray-200 focus:border-black py-2.5 px-3 text-sm resize-none transition-colors outline-none"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInquiryChange}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-10 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm"
                                        disabled={inquiryStatus === 'sending'}
                                    >
                                        {inquiryStatus === 'sending' ? 'Sending...' : 'Send'}
                                    </button>
                                    {inquiryStatus === 'error' && (
                                        <p className="text-red-600 text-xs mt-2">Failed to send inquiry. Please try again.</p>
                                    )}
                                </form>
                            )}
                        </div>

                        {/* Quote Button */}
                        <button className="w-full bg-[#fcd475] hover:bg-[#fbbd4d] text-black py-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all mb-8 shadow-sm">
                            Request a quote
                        </button>

                        {/* Links */}
                        <div className="flex flex-col gap-3 mb-10">
                            <Link href="/size-chart" className="text-[17px] font-bold underline text-black hover:opacity-70 transition-opacity decoration-2 underline-offset-4 w-fit">Size Chart</Link>
                            <Link href="#" className="text-[17px] font-bold underline text-black hover:opacity-70 transition-opacity decoration-2 underline-offset-4 w-fit">Measurement Guide</Link>
                        </div>

                        {/* Accordion */}
                        <div className="border-t border-gray-200">
                            {[
                                { icon: 'schedule', label: 'Delivery Time', value: '8 to 12 weeks' },
                                { icon: 'public', label: 'Shipping', value: 'We deliver worldwide. Shipping rates may apply.' },
                                { icon: 'square_foot', label: 'Customization', value: 'For customization please contact our fashion consultant' },
                                { icon: 'sell', label: 'Details', value: details }
                            ].map((item, idx) => (
                                <details key={idx} className="group border-b border-gray-200">
                                    <summary className="flex items-center gap-4 py-4 cursor-pointer list-none list-inside">
                                        <span className="material-symbols-outlined text-gray-800 text-[18px]">{item.icon}</span>
                                        <span className="text-[14px] font-medium flex-1 text-gray-900">{item.label}</span>
                                    </summary>
                                    <div className="pb-6 pl-12 text-[15px] text-gray-700 leading-relaxed font-light whitespace-pre-line">
                                        {item.value}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="mt-24 pt-20 border-t border-gray-100">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#181611] mb-4">You May Also Like</h2>
                    <div className="w-12 h-[1px] bg-[#bd870a] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p, i) => (
                        <div key={p.id} className="relative group">
                            <Link href={`/product/${p.slug}`}>
                                <div className="aspect-[3/4.2] relative bg-gray-100 overflow-hidden mb-4">
                                    <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <h3 className="text-sm font-serif">{p.title}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{p.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
