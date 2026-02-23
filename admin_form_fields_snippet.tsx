
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2" htmlFor="sku">SKU / Reference Number</label>
        <input
            className="w-full bg-transparent border-0 border-b border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 transition-colors placeholder:text-black/20 outline-none"
            id="sku"
            placeholder="e.g. MB 8"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
        />
    </div>
</div>

{/* Accordion Content Sections */ }
<div className="border-t border-black/10 pt-8 mt-8">
    <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/80 mb-6">Product Detail Page Content</h3>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Size Chart
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={4}
            value={sizeChart}
            onChange={(e) => setSizeChart(e.target.value)}
            placeholder="Enter size chart information..."
        />
    </details>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Measurement Guide
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={4}
            value={measurementGuide}
            onChange={(e) => setMeasurementGuide(e.target.value)}
            placeholder="Enter measurement guide..."
        />
    </details>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Delivery Time
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={3}
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            placeholder="e.g. 8 to 12 weeks"
        />
    </details>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Shipping Information
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={3}
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            placeholder="e.g. We deliver worldwide. Shipping rates may apply."
        />
    </details>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Customization
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={3}
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
            placeholder="e.g. For customization please contact our fashion consultant"
        />
    </details>

    <details className="group mb-4">
        <summary className="cursor-pointer list-none text-[10px] uppercase tracking-widest font-bold text-black/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Price Information
        </summary>
        <textarea
            className="w-full bg-white border border-black/10 focus:border-[#bd870a] focus:ring-0 text-sm py-3 px-4 transition-colors placeholder:text-black/20 outline-none resize-none"
            rows={3}
            value={priceInfo}
            onChange={(e) => setPriceInfo(e.target.value)}
            placeholder="Enter pricing details or payment options..."
        />
    </details>
</div>
