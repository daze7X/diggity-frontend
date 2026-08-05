import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RedirectRule {
    from_path: string;
    to_path: string;
    status_code: number;
}

// In-memory cache for redirects list to keep middleware super fast
let cachedRedirects: RedirectRule[] | null = null;
let cacheExpiryTime = 0;

async function fetchRedirectRules(): Promise<RedirectRule[]> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    try {
        const res = await fetch(`${apiBaseUrl}/seo/redirects`, {
            next: { revalidate: 60 } // Next.js fetch cache configuration
        });
        const data = await res.json();
        if (data && data.success && Array.isArray(data.redirects)) {
            return data.redirects;
        }
    } catch (err) {
        console.error('Failed to fetch redirect rules in middleware:', err);
    }
    return [];
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static assets, images, favicon, api, and admin requests
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Refresh redirects cache every 60 seconds
    const now = Date.now();
    if (!cachedRedirects || now > cacheExpiryTime) {
        cachedRedirects = await fetchRedirectRules();
        cacheExpiryTime = now + 60000; // 1 minute cache duration
    }

    // Find if the current path matches a redirect rule
    const matchingRule = cachedRedirects.find((rule) => {
        // Match exact path, e.g. "/tentang-kami"
        return rule.from_path === pathname || rule.from_path === `${pathname}/`;
    });

    if (matchingRule) {
        const targetUrl = matchingRule.to_path.startsWith('http')
            ? matchingRule.to_path
            : new URL(matchingRule.to_path, request.url).toString();

        return NextResponse.redirect(targetUrl, matchingRule.status_code || 301);
    }

    return NextResponse.next();
}

// Configure paths that will trigger this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
