
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CollectionRow from "@/components/CollectionRow";
import { getAllProductsByCategory } from "@/utils/db";

export const dynamic = 'force-dynamic';


export default async function Menswear() {
    const menswearProducts = (await getAllProductsByCategory('Menswear'))
        .filter(p => p.id !== '301' && p.id !== '303');


    // Group products by subcategory
    const productsByCollection: { [key: string]: typeof menswearProducts } = {};
    const mainProducts: typeof menswearProducts = [];

    menswearProducts.forEach(product => {
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
            <section className="max-w-[1440px] mx-auto text-center px-8 mb-16">
                <h2 className="text-5xl md:text-6xl font-serif tracking-tight mb-2">Menswear</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">The Art of Masculine Heritage</p>
                <div className="w-12 h-[1px] bg-[#bd870a] mx-auto mt-8"></div>
            </section>

            <section className="pb-24 px-8 md:px-20 max-w-[1440px] mx-auto">
                {/* Collections - Each with horizontal scrollable row */}
                {Object.entries(productsByCollection).map(([collectionName, products]) => (
                    <CollectionRow
                        key={collectionName}
                        title={collectionName}
                        products={products}
                        categorySlug="menswear"
                    />
                ))}

                {/* Main Menswear Products (no collection) */}
                {mainProducts.length > 0 && (
                    <div className="mb-16">


                        {/* Main Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
            </section>
        </div>
    );
}
