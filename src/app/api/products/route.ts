
import { NextResponse } from 'next/server';
import { getProducts, addProduct, deleteProduct, Product } from '@/utils/db';


export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProduct: Product = {
            id: crypto.randomUUID(), // Node 19+ / Edge
            slug: body.slug || body.title.toLowerCase().replace(/ /g, '-'),
            title: body.title,
            category: body.category,
            subcategory: body.subcategory || '',
            price: body.price || 'Price on Request',
            images: body.images || [], // Should be array of paths
            description: body.description || '',
            color: body.color || '',
            fabric: body.fabric || '',
            details: body.details || '',
            sku: body.sku || '',
            sizeChart: body.sizeChart || '',
            measurementGuide: body.measurementGuide || '',
            deliveryTime: body.deliveryTime || '',
            shipping: body.shipping || '',
            customization: body.customization || '',
            priceInfo: body.priceInfo || ''
        };

        // db.products.push(newProduct);
        await addProduct(newProduct);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await deleteProduct(id);
        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
