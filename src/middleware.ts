import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;

  if (!token && req.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
