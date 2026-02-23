import { getCategories } from "@/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const categories = await getCategories();

        // Return formatted data for debugging
        return NextResponse.json({
            total: categories.length,
            categories: categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                mainCategory: cat.mainCategory,
                order: cat.order
            }))
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Debug categories error:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
