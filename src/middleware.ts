import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Logical routes that require authentication (matched after the locale prefix
// is stripped, so /settings, /de/settings, /uk/settings are all covered).
const PROTECTED = ["/settings"];

// Only non-default locales carry a URL prefix (localePrefix: "as-needed"), so
// `en` is intentionally excluded here.
const prefixLocales = routing.locales.filter((l) => l !== routing.defaultLocale);
const LOCALE_PREFIX = new RegExp(`^/(${prefixLocales.join("|")})(?=/|$)`);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Split any locale prefix off the path to test the logical route.
  const localeMatch = pathname.match(LOCALE_PREFIX);
  const localePrefix = localeMatch ? localeMatch[0] : "";
  const pathWithoutLocale = pathname.slice(localePrefix.length) || "/";

  const isProtected = PROTECTED.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`)
  );

  if (isProtected) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      // Send unauthenticated users to the localized home with the login modal.
      const url = new URL(`${localePrefix}/`, req.url);
      url.searchParams.set("auth", "login");
      return NextResponse.redirect(url);
    }
  }

  // Locale negotiation / rewriting for everything else (en stays at root).
  return intlMiddleware(req);
}

export const config = {
  // Run on everything except API routes, Next internals, and files with an
  // extension (static assets, /sitemap.xml, /robots.txt, the IndexNow key .txt,
  // /manifest.webmanifest, favicons — these must stay non-localized).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
