
import { notFound } from "next/navigation";
import { getProducts, getProductsByCategory } from "@/utils/db";
import { slugify } from "@/utils/slugify";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const slugParam = slugify(decodedSlug);

    const allProducts = await getProducts();
    const product = allProducts.find(p => 
        slugify(p.slug || "") === slugParam || 
        slugify(p.title || "") === slugParam ||
        slugify(p.sku || "") === slugParam
    );

    if (!product) {
        return notFound();
    }

    const allCategoryProducts = await getProductsByCategory(product.category);
    const relatedProducts = allCategoryProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4);

    return (
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    );
}
