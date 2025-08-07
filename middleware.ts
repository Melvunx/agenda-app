import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (
    !sessionCookie &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/signin?auth=required", request.url));
  }

  if (sessionCookie && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL("/dashboard?auth=success", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/averge-calculator",
    "/dashboard/notes",
    "/dashboard/subjects",
    "/dashboard/schedule",
    "/dashboard/settings",
  ],
};
