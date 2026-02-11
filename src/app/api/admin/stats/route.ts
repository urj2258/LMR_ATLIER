
import { NextResponse } from 'next/server';
import { getProducts, getSubscribers, getInquiries } from '@/utils/db';

export async function GET() {
    try {
        const [products, subscribers, inquiries] = await Promise.all([
            getProducts(),
            getSubscribers(),
            getInquiries()
        ]);

        return NextResponse.json({
            products: products.length,
            subscribers: subscribers.length,
            inquiries: inquiries.length,
            recentSubscribers: [...subscribers].reverse().slice(0, 5)
        });
    } catch (error) {
        console.error('Stats API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
