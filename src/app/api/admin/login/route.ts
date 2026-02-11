
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Hardcoded credentials for "Single Admin" requirement
        // In a real env, these would be in process.env
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@luxekhadi.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true, message: 'Login successful' });

            // Set HttpOnly cookie
            response.cookies.set('admin_token', 'secure_admin_token_value', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return response;
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
