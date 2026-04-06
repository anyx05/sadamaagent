import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// 1. Create the internationalization router
const handleI18nRouting = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 2. Process locale routing first (resolves /en/, /et/ paths based on headers)
  let response = handleI18nRouting(request);

  // 3. Setup Supabase to attach to the response the i18n router just generated
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not add any logic between createServerClient and
  // supabase.auth.getUser().
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Secure the Dashboard routes
  if (request.nextUrl.pathname.includes("/dashboard") && !user) {
    const url = request.nextUrl.clone();
    // Redirect to root login page, next-intl will automatically apply the locale prefix
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
