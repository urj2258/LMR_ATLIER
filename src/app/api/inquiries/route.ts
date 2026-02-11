
import { NextResponse } from 'next/server';
import { getInquiries, addInquiry, Inquiry } from '@/utils/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.customerName || !body.customerContact || !body.productName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newInquiry: Inquiry = {
            id: crypto.randomUUID(),
            productName: body.productName,
            productCategory: body.productCategory || 'Uncategorized',
            customerName: body.customerName,
            customerContact: body.customerContact,
            message: body.message || '',
            date: new Date().toISOString(),
            status: 'New'
        };

        await addInquiry(newInquiry);

        return NextResponse.json({ message: 'Inquiry received' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
}
