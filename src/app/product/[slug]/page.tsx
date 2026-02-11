
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory } from "@/utils/db";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

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
