import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'rk_admin_token';
const JWT_SECRET_STRING = process.env.NEXTAUTH_SECRET || 'rk_international_language_academy_super_secure_jwt_token_key_2026';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

interface TokenPayload {
  userId: string;
  username: string;
  role: 'superadmin' | 'staff';
  permissions: {
    enquiries: boolean;
    courses: boolean;
    trainers?: boolean;
    blog: boolean;
    settings: boolean;
    testimonials: boolean;
  };
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let verifiedPayload: TokenPayload | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      verifiedPayload = payload as unknown as TokenPayload;
    } catch {
      verifiedPayload = null;
    }
  }

  // If visiting /admin/login
  if (pathname === '/admin/login') {
    // If already logged in, redirect to admin dashboard
    if (verifiedPayload) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // For any other /admin route, require valid token
  if (!verifiedPayload) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Super Admin Exclusive routes (e.g. /admin/admins)
  if (pathname.startsWith('/admin/admins') && verifiedPayload.role !== 'superadmin') {
    return NextResponse.redirect(new URL('/admin/dashboard?error=unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
