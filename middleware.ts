import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { jwtDecode } from 'jwt-decode';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|public|images|icons|assets|favicon.ico|sw.js|site.webmanifest).*)']
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const url = req.url;
  const { pathname } = req.nextUrl;

  const userRoutes = [
    "/[lng]/dashboard/user/profile",
    "/[lng]/dashboard/user/my-bookings",
    "/[lng]/dashboard/user/transactions",
    "/[lng]/dashboard/user/favorites"
  ];

  const agentRoutes = [
    // "/[lng]/dashboard",
    "/[lng]/dashboard/agent/profile",
    "/[lng]/dashboard/agent/add-property",
    "/[lng]/dashboard/agent/my-properties",
    "/[lng]/dashboard/agent/bookings",
    "/[lng]/dashboard/agent/transactions",
    "/[lng]/dashboard/agent/manage-properties",
    "/[lng]/dashboard/agent/profile",
    "/[lng]/dashboard/agent/payment/:id"
  ];

  const adminRoutes = [
    // "/[lng]/dashboard",
    "/[lng]/dashboard/admin/profile",
    "/[lng]/dashboard/admin/transactions",
    "/[lng]/dashboard/admin/all-users",
    "/[lng]/dashboard/admin/all-agents",
    "/[lng]/dashboard/admin/all-bookings",
    "/[lng]/dashboard/admin/all-properties",
  ];

  // Language detection and redirection
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    if(req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(`/${lng}`, req.url));
    }
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // Role-based redirection
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken['role'];

    // Adjust URLs for role-based redirection
    const adjustedUrl = `/${lng}${pathname}`; // Construct adjusted URL with [lng] parameter

    if (role === "user" && (adminRoutes.includes(adjustedUrl) || agentRoutes.includes(adjustedUrl))) {
      return NextResponse.redirect(new URL("/", url));
    }

    if (role === "agent" && (userRoutes.includes(adjustedUrl) || adminRoutes.includes(adjustedUrl))) {
      return NextResponse.redirect(new URL("/", url));
    }

    if (role === "admin" && (userRoutes.includes(adjustedUrl) || agentRoutes.includes(adjustedUrl))) {
      return NextResponse.redirect(new URL("/", url));
    }

    return NextResponse.next();
  } else if (!token && url.includes(`/${lng}/dashboard`)) {
    return NextResponse.redirect(new URL("/", url));
  }

  // Default behavior
  return NextResponse.next();
}