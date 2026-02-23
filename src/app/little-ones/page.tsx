
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CollectionRow from "@/components/CollectionRow";
import { getAllProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function LittleOnes() {
    const kidsProducts = await getAllProductsByCategory('Little Ones');

    // Group products by subcategory
    const productsByCollection: { [key: string]: typeof kidsProducts } = {};
    const mainProducts: typeof kidsProducts = [];

    kidsProducts.forEach(product => {
        if (product.subcategory && product.subcategory !== '') {
            if (!productsByCollection[product.subcategory]) {
                productsByCollection[product.subcategory] = [];
            }
            productsByCollection[product.subcategory].push(product);
        } else {
            mainProducts.push(product);
        }
    });

    return (
        <div className="pt-8">
            {/* Headline Section */}
            <div className="max-w-7xl mx-auto px-4 pb-4">
                <h1 className="font-serif text-[#181611] tracking-[0.2em] text-[42px] md:text-[64px] font-extralight leading-tight text-center uppercase">
                    Little Ones
                </h1>
                <div className="w-16 h-[1px] bg-[#bd870a] mx-auto mt-6"></div>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-400 text-center max-w-lg mx-auto">Heritage miniatures for the smallest stars.</p>
            </div>

            {/* Collection Grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 pb-20 pt-16">
                {/* Collections - Each with horizontal scrollable row */}
                {Object.entries(productsByCollection).map(([collectionName, products]) => (
                    <CollectionRow
                        key={collectionName}
                        title={collectionName}
                        products={products}
                        categorySlug="little-ones"
                    />
                ))}

                {/* Main Little Ones Products (no collection) */}
                {mainProducts.length > 0 && (
                    <div className="mb-16">
                        {Object.keys(productsByCollection).length > 0 && (
                            <div className="mb-8 text-center">
                                <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-gray-900 mb-2">
                                    Little Ones Essentials
                                </h3>
                                <div className="w-8 h-[1px] bg-[#bd870a] mx-auto mt-4"></div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {mainProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    src={product.images[0]}
                                    secondarySrc={product.images[1] || product.images[0]}
                                    title={product.title}
                                    index={index}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
