import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'ne';
const locales = ['en', 'ne'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Skip if it's an internal Next.js path or static file
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get language from cookie or header (simplified for now to default)
    const locale = defaultLocale;

    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
