
import { NextResponse } from 'next/server';
import { getSubscribers, addSubscriber, isAlreadySubscribed, Subscriber } from '@/utils/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if already subscribed
        const subscribed = await isAlreadySubscribed(body.email);
        if (subscribed) {
            return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
        }

        const newSubscriber: Subscriber = {
            id: crypto.randomUUID(),
            name: body.name || 'Anonymous',
            email: body.email,
            date: new Date().toISOString()
        };

        await addSubscriber(newSubscriber);

        return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    // Admin only - validation to be added
    const subscribers = await getSubscribers();
    return NextResponse.json(subscribers);
}
