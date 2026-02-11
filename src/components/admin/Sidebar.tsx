
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminFetch } from "@/utils/adminFetcher";

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const prefetch = (apiPath: string) => {
        adminFetch(apiPath);
    };

    return (
        <aside className="w-64 bg-white border-r border-[#eeeeee] flex flex-col fixed h-full z-10 transition-all font-sans">
            <div className="p-8 border-b border-[#eeeeee]">
                <div className="flex items-center gap-3 mb-2">
                    <div className="size-6 text-[#bd870a]">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <span className="font-serif font-bold tracking-[0.2em] text-sm uppercase">Luxe Admin</span>
                </div>
            </div>
            <nav className="flex-grow py-8">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            onMouseEnter={() => prefetch('/api/admin/stats')}
                            className={`flex items-center gap-4 px-8 py-3 text-[11px] uppercase tracking-widest transition-colors ${isActive('/admin/dashboard')
                                ? 'text-[#bd870a] font-bold border-r-2 border-[#bd870a] bg-[#bd870a]/5'
                                : 'text-black/40 hover:text-[#bd870a]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">dashboard</span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/products"
                            onMouseEnter={() => prefetch('/api/products')}
                            className={`flex items-center gap-4 px-8 py-3 text-[11px] uppercase tracking-widest transition-colors ${isActive('/admin/products')
                                ? 'text-[#bd870a] font-bold border-r-2 border-[#bd870a] bg-[#bd870a]/5'
                                : 'text-black/40 hover:text-[#bd870a]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">image</span>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/categories"
                            onMouseEnter={() => prefetch('/api/categories')}
                            className={`flex items-center gap-4 px-8 py-3 text-[11px] uppercase tracking-widest transition-colors ${isActive('/admin/categories')
                                ? 'text-[#bd870a] font-bold border-r-2 border-[#bd870a] bg-[#bd870a]/5'
                                : 'text-black/40 hover:text-[#bd870a]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">category</span>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/subscribers"
                            onMouseEnter={() => prefetch('/api/subscribers')}
                            className={`flex items-center gap-4 px-8 py-3 text-[11px] uppercase tracking-widest transition-colors ${isActive('/admin/subscribers')
                                ? 'text-[#bd870a] font-bold border-r-2 border-[#bd870a] bg-[#bd870a]/5'
                                : 'text-black/40 hover:text-[#bd870a]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">mail</span>
                            Subscribers
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/inquiries"
                            onMouseEnter={() => prefetch('/api/inquiries')}
                            className={`flex items-center gap-4 px-8 py-3 text-[11px] uppercase tracking-widest transition-colors ${isActive('/admin/inquiries')
                                ? 'text-[#bd870a] font-bold border-r-2 border-[#bd870a] bg-[#bd870a]/5'
                                : 'text-black/40 hover:text-[#bd870a]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>
                            Inquiries
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="p-8 border-t border-[#eeeeee]">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#e9e4d9] flex items-center justify-center text-[10px] font-bold">JD</div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-tight">Admin User</p>
                        <p className="text-[9px] text-black/40 uppercase tracking-widest">Administrator</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
