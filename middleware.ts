import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Define paths that do NOT require authentication
    // - /api/sso (The entry point for login)
    // - /unauthorized (The error page)
    // - /_next (Next.js internals)
    // - /favicon.ico, /public files (Static assets)
    const publicPaths = ["/api/sso", "/unauthorized", "/favicon.ico"]
    if (publicPaths.some((path) => pathname.startsWith(path)) || pathname.startsWith("/_next")) {
        return NextResponse.next()
    }

    // 2. Check for the 'user_info' cookie
    const userInfo = request.cookies.get("user_info")

    // 3. If cookie is missing, redirect to /unauthorized
    if (!userInfo) {
        // You can also redirect to the PHP login page if you have that URL
        // return NextResponse.redirect('https://kobe.pmgasia.co.kr/login...')

        const url = request.nextUrl.clone()
        url.pathname = "/unauthorized"
        return NextResponse.redirect(url)
    }

    // 4. If cookie exists, proceed
    // Implement Sliding Expiration: Refresh the cookie for another 30 mins
    const response = NextResponse.next()

    const isProduction = process.env.NODE_ENV === "production"

    response.cookies.set("user_info", userInfo.value, {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 30, // 30 minutes
        sameSite: "lax",
        secure: isProduction,
    })

    return response
}

export const config = {
    // Matcher: Optimize to exclude static files and paths that don't need auth checking
    // This reduces the load on the middleware and prevents timeouts
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/sso (login endpoint)
         * - unauthorized (error page)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - common image extensions
         */
        "/((?!api/sso|unauthorized|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
