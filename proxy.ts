import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'ne';
const locales = ['en', 'ne'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // १. Static फाइलहरूलाई पूर्ण रूपमा वास्ता नगर्ने (Exclusion)
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') || // यसले .json, .js, .png सबैलाई बचाउँछ
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // २. ल्याङ्ग्वेज चेक गर्ने
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // सिधै रिडाइरेक्ट गर्नु अघि जाँच गर्ने
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Static फाइलहरूलाई म्याचरबाटै हटाउने
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};