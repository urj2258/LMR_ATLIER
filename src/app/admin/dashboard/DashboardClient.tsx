"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminFetch, subscribeToCache } from "@/utils/adminFetcher";

interface Stats {
    products: number;
    subscribers: number;
    inquiries: number;
    recentSubscribers: any[];
}

export default function DashboardClient() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = '/api/admin/stats';

        const unsubscribe = subscribeToCache(url, (data) => {
            setStats(data);
            setIsLoading(false);
        });

        adminFetch(url);

        return () => unsubscribe();
    }, []);

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-8 border border-[#eeeeee] h-32"></div>
                ))}
            </div>
            <div className="bg-white border border-[#eeeeee] h-64"></div>
        </div>
    );

    if (isLoading) return (
        <div className="admin-page">
            <header className="mb-12">
                <div className="h-4 w-24 bg-gray-100 mb-2"></div>
                <div className="h-8 w-48 bg-gray-100"></div>
            </header>
            <LoadingSkeleton />
        </div>
    );

    return (
        <>
            <header className="flex justify-between items-end mb-12">
                <div>
                    <nav className="text-[10px] uppercase tracking-widest text-black/40 mb-2">
                        Portal / CRM
                    </nav>
                    <h1 className="text-3xl font-serif font-light tracking-tight">Dashboard</h1>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 border border-[#eeeeee] shadow-sm">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-2">Total Products</p>
                    <p className="text-3xl font-serif">{stats?.products || 0}</p>
                </div>
                <div className="bg-white p-8 border border-[#eeeeee] shadow-sm">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-2">Total Subscribers</p>
                    <p className="text-3xl font-serif">{stats?.subscribers || 0}</p>
                </div>
                <div className="bg-white p-8 border border-[#eeeeee] shadow-sm">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-2">Active Inquiries</p>
                    <p className="text-3xl font-serif">{stats?.inquiries || 0}</p>
                </div>
            </div>

            <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#eeeeee] flex justify-between items-center bg-[#e9e4d9]/10">
                    <h3 className="font-serif text-lg">Recent Subscribers</h3>
                    <Link href="/admin/subscribers" className="text-[10px] uppercase tracking-widest font-bold text-[#bd870a] hover:opacity-80">View All</Link>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#eeeeee] bg-[#e9e4d9]/10">
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Name</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Email</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eeeeee]">
                        {stats?.recentSubscribers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-8 text-center text-sm text-gray-400 italic">No subscribers yet.</td>
                            </tr>
                        ) : (
                            stats?.recentSubscribers.map((sub) => (
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
        </>
    );
}
