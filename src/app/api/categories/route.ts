
import { NextResponse } from "next/server";
import { getCategories, addCategory, deleteCategory } from "@/utils/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("GET /api/categories error:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.name || !data.slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        const newCategory = {
            id: data.id || Date.now().toString(),
            name: data.name,
            slug: data.slug,
            order: data.order || 0,
            mainCategory: data.mainCategory,
            createdAt: new Date().toISOString(),
        };

        await addCategory(newCategory);
        return NextResponse.json(newCategory);
    } catch (error) {
        console.error("POST /api/categories error:", error);
        return NextResponse.json({ error: "Failed to save category" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        await deleteCategory(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/categories error:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
