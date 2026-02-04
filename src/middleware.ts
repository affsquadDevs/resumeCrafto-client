import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthPage = req.nextUrl.pathname.startsWith('/api/auth');

    // If it's a protected route and no token, redirect to home with auth=login
    if (!token && !isAuthPage) {
        const url = new URL('/', req.url);
        url.searchParams.set('auth', 'login');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/resume-builder/:path*', '/settings/:path*'],
};
