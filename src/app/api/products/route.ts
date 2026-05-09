
import { NextResponse } from 'next/server';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct, Product } from '@/utils/db';
import { generateSku } from '@/utils/skuGenerator';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const product = await getProductById(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    }

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

        // Auto-generate SKU if not provided
        let sku = body.sku || '';
        if (!sku) {
            const existingProducts = await getProducts();
            const existingSkus = existingProducts
                .map((p: Product) => p.sku)
                .filter(Boolean) as string[];
            sku = generateSku(
                body.category,
                body.subcategory || '',
                existingSkus
            ) || '';
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
            sku,
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

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
        }

        const { id, ...updateData } = body;
        await updateProduct(id, updateData);
        
        return NextResponse.json({ id, ...updateData });
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
