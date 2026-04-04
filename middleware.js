import { NextResponse } from 'next/server';
import { decrypt } from './lib/session';
import { cookies } from 'next/headers';

// Define the protected routes prefix
const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route)) && !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Retrieve cookie directly using Edge-compatible logic
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;
  
  let session = null;
  if (sessionValue) {
    session = await decrypt(sessionValue);
  }

  // Decrypted session will be null if invalid/expired
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Add matcher logic to optimize executions
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|attached_assets|uploads).*)'],
};
