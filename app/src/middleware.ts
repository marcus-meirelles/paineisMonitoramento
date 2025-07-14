import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";


const notProtectedRoutes = [
  "/signin",
  "/signup"

];

// Helper function to check if a path is protected
function isNotProtectedRoute(path: string): boolean {
  return !notProtectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;
  
  if(currentPath.startsWith("/signin") && user.ok === true)
    return NextResponse.redirect(new URL("/home", request.url));

  if (isNotProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};