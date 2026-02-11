"use client";

import { useState, useEffect } from "react";
import { adminFetch, subscribeToCache } from "@/utils/adminFetcher";

export default function InquiriesClient() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = '/api/inquiries';

        // 1. Subscribe to cache updates (SWR)
        const unsubscribe = subscribeToCache(url, (data) => {
            setInquiries([...data].reverse());
            setIsLoading(false);
        });

        // 2. Trigger background revalidation
        adminFetch(url);

        return () => unsubscribe();
    }, []);

    const LoadingTable = () => (
        <div className="animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-gray-50 mb-2 border-b border-[#eeeeee]"></div>
            ))}
        </div>
    );

    return (
        <div className="admin-page">
            <header className="flex justify-between items-end mb-12">
                <div>
                    <nav className="text-[10px] uppercase tracking-widest text-black/40 mb-2">
                        Portal / Orders
                    </nav>
                    <h1 className="text-3xl font-serif font-light tracking-tight">Active Inquiries</h1>
                </div>
            </header>

            <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#eeeeee] bg-[#e9e4d9]/10">
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Customer</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Product</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Message</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Status</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eeeeee]">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-8">
                                    <LoadingTable />
                                </td>
                            </tr>
                        ) : inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-8 text-center text-sm text-gray-400 italic">No inquiries yet.</td>
                            </tr>
                        ) : (
                            inquiries.map((inq) => (
                                <tr key={inq.id} className="hover:bg-[#fcfaf7]/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-semibold tracking-wide uppercase">{inq.customerName}</p>
                                        <p className="text-[10px] text-black/40 font-medium">{inq.customerContact}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-medium">{inq.productName}</p>
                                        <p className="text-[9px] uppercase tracking-widest text-[#bd870a]">{inq.productCategory}</p>
                                    </td>
                                    <td className="px-8 py-5 text-xs text-black/60 font-light truncate max-w-[200px]" title={inq.message}>
                                        {inq.message || '-'}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-full font-bold ${inq.status === 'New' ? 'bg-green-50 text-green-700' :
                                            inq.status === 'Contacted' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-[10px] uppercase tracking-widest text-black/60">
                                        {new Date(inq.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
