
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const adminToken = request.cookies.get('admin_token')?.value;

    // 1. Protect Admin Pages
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 2. Protect API Routes
    if (pathname.startsWith('/api/')) {
        if (pathname === '/api/admin/login') {
            return NextResponse.next();
        }

        const protectedRoutes = ['/api/upload', '/api/admin'];
        const isProtectedBase = protectedRoutes.some(route => pathname.startsWith(route));

        const sensitiveRouteMethods: Record<string, string[]> = {
            '/api/products': ['POST', 'PUT', 'DELETE'],
            '/api/subscribers': ['GET', 'DELETE'],
            '/api/inquiries': ['GET', 'PATCH', 'DELETE']
        };

        const method = request.method;
        const requiresAuth = isProtectedBase || (sensitiveRouteMethods[pathname] && sensitiveRouteMethods[pathname].includes(method));

        if (requiresAuth && !adminToken) {
            return NextResponse.json(
                { error: 'Unauthorized: Admin access required' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/:path*',
    ],
};
