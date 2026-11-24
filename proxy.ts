import { NextResponse, type NextRequest } from "next/server";

const supportedLocales = ["en", "mr"] as const;

function getPreferredLocale(request: NextRequest) {
  const acceptedLanguages = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .split(",")
    .map((value) => value.trim().split(";")[0]) ?? [];

  return acceptedLanguages.some((value) => value === "mr" || value.startsWith("mr-"))
    ? "mr"
    : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }
  const hasLocale = supportedLocales.some(
    (locale) => pathname === "/" + locale || pathname.startsWith("/" + locale + "/"),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/" + getPreferredLocale(request) + pathname;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|icon.jpeg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
