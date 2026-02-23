
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProductsByCategory, getProductsBySubcategory } from "@/utils/db";

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
    params: Promise<{
        slug: string;
    }>;
}


export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;

    // 1. Fetch categories to find the metadata for this slug

    const categories = await getCategories();
    // Case-insensitive slug comparison with safety guard
    const category = categories.find(c => c.slug?.toLowerCase() === slug.toLowerCase());



    if (!category) {
        notFound();
    }

    // 2. Determine if it's a main category or a subcategory and fetch products
    let products = [];
    let breadcrumbs = [];

    if (category.mainCategory) {
        // It's a subcategory
        products = await getProductsBySubcategory(category.mainCategory, category.name);
        breadcrumbs = [
            { name: "Home", href: "/" },
            { name: category.mainCategory, href: `/${category.mainCategory.toLowerCase().replace(/ /g, '-')}` },
            { name: category.name, href: `/collections/${category.slug}` }
        ];
    } else {
        // It's a main category
        products = await getProductsByCategory(category.name);
        breadcrumbs = [
            { name: "Home", href: "/" },
            { name: category.name, href: `/collections/${category.slug}` }
        ];
    }

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-8 mt-24">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 py-8 text-[11px] uppercase tracking-widest text-gray-400 font-medium">
                {breadcrumbs.map((bc, index) => (
                    <div key={bc.href} className="flex items-center gap-2">
                        {index > 0 && <span className="text-[10px] opacity-50">/</span>}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-charcoal font-bold">{bc.name}</span>
                        ) : (
                            <Link className="hover:text-gold-champagne transition-colors" href={bc.href}>{bc.name}</Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Collection Heading */}
            <div className="text-center mb-16">
                <h2 className="font-serif text-5xl md:text-6xl text-[#181611] mb-6 tracking-tight">{category.name}</h2>
                <div className="w-12 h-[1px] bg-gold-champagne mx-auto"></div>
                {category.mainCategory && (
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mt-4">{category.mainCategory} Collection</p>
                )}
            </div>

            {/* Editorial Grid */}
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 italic">Coming Soon...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            src={product.images[0]}
                            secondarySrc={product.images[1]}
                            title={product.title}
                            slug={product.slug}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

