
import EditProductClient from "./EditProductClient";
import { getProductById, getCategories } from "@/utils/db";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    const categories = await getCategories();

    if (!product) {
        return notFound();
    }

    return <EditProductClient product={product} categories={categories} />;
}
