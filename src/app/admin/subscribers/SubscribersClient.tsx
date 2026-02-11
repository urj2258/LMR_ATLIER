"use client";

import { useState, useEffect } from "react";
import { adminFetch, subscribeToCache } from "@/utils/adminFetcher";

export default function SubscribersClient() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = '/api/subscribers';

        const unsubscribe = subscribeToCache(url, (data) => {
            setSubscribers([...data].reverse());
            setIsLoading(false);
        });

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
                        Portal / CRM
                    </nav>
                    <h1 className="text-3xl font-serif font-light tracking-tight">Newsletter Subscribers</h1>
                </div>
            </header>

            <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#eeeeee] bg-[#e9e4d9]/10">
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Name</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Email</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eeeeee]">
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-8">
                                    <LoadingTable />
                                </td>
                            </tr>
                        ) : subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-8 text-center text-sm text-gray-400 italic">No subscribers yet.</td>
                            </tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-[#fcfaf7]/50 transition-colors">
                                    <td className="px-8 py-5 text-xs font-semibold tracking-wide uppercase">{sub.name}</td>
                                    <td className="px-8 py-5 text-xs font-medium tracking-wide">{sub.email}</td>
                                    <td className="px-8 py-5 text-[10px] uppercase tracking-widest text-black/60">
                                        {new Date(sub.date).toLocaleDateString()}
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
