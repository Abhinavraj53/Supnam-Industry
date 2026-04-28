import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'pujnam_admin';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'pujnam-secret-token-2024';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (token !== ADMIN_TOKEN) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
