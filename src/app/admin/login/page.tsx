
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Changed from 'a' to 'Link' for Next.js

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is JSON before parsing
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned an invalid response. Please check the API route.");
            }

            const data = await res.json();

            if (res.ok && data.success) {
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#f0f0f0] flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <div className="size-8 text-[#bd870a]">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-lg font-bold tracking-[0.3em] uppercase mb-2 font-serif">LMR Atelier</h1>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium italic">Administrative Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="email">Admin Email</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
                                id="email"
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="password">Password</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors outline-none"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-[#cc3333] text-[11px] font-medium italic animate-pulse">
                                <span className="material-symbols-outlined text-sm">error</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            className="w-full bg-[#121212] text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all mt-4 disabled:opacity-50"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Secure Login"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link className="text-[10px] uppercase tracking-widest text-black/30 hover:text-[#bd870a] transition-colors" href="#">Forgot Access Keys?</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
