"use client";

import React from "react";

export default function SizeChart() {
    return (
        <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
            {/* Headline */}
            <div className="text-center mb-16">
                <h1 className="text-[#181611] tracking-[0.1em] text-4xl md:text-5xl font-bold uppercase mb-4">
                    Size Chart
                </h1>
                <div className="w-16 h-0.5 bg-[#bd870a] mx-auto"></div>
            </div>

            {/* Main Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-start">
                {/* Left Column: Women's */}
                <div className="space-y-12">
                    <div className="border-b border-[#bd870a]/20 pb-4 mb-8">
                        <h2 className="text-2xl font-bold text-[#bd870a] tracking-wide uppercase">
                            Women’s Size Chart
                        </h2>
                    </div>
                    {/* Women's Shirt Table */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold italic text-gray-700">
                            Shirt (Inches)
                        </h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-sm shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f5f5f5]">
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200 w-1/4">
                                            Metric
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Small
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Medium
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Large
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Shoulder</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            14.5"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            15.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            15.5"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Chest</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            36.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            43.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Waist</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            32.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            35.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Hip</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            38.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            41.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            45.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Length</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            38.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            40.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Sleeve</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            22.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            23.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            23.5"
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Women's Pants Table */}
                    <div className="space-y-4 pt-6">
                        <h3 className="text-lg font-bold italic text-gray-700">
                            Pants (Inches)
                        </h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-sm shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f5f5f5]">
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200 w-1/4">
                                            Metric
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Small
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Medium
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Large
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Waist</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            26-28"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            29-31"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            32-34"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Hip</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            36.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            42.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Length</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            38.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            40.0"
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Men's */}
                <div className="space-y-12">
                    <div className="border-b border-[#bd870a]/20 pb-4 mb-8">
                        <h2 className="text-2xl font-bold text-[#bd870a] tracking-wide uppercase">
                            Men’s Size Chart
                        </h2>
                    </div>
                    {/* Men's Shirt Table */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold italic text-gray-700">
                            Shirt (Inches)
                        </h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-sm shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f5f5f5]">
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200 w-1/4">
                                            Metric
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Small
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Medium
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Large
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Collar</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            15.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            15.5"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            16.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Chest</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            40.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            42.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            44.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Waist</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            38.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            40.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            42.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Length</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            29.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            30.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            31.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Sleeve</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            24.5"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            25.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            26.0"
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Men's Trouser Table */}
                    <div className="space-y-4 pt-6">
                        <h3 className="text-lg font-bold italic text-gray-700">
                            Trouser/Shalwar (Inches)
                        </h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-sm shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f5f5f5]">
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200 w-1/4">
                                            Metric
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Small
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Medium
                                        </th>
                                        <th className="px-4 py-3 text-sm font-semibold border-b border-gray-200">
                                            Large
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Waist</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            30-32"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            33-35"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            36-38"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Length</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            39.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            40.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            41.0"
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#bd870a]/5 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium">Inseam</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            28.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            29.0"
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            30.0"
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
