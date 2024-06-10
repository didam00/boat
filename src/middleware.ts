import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const onlyVerified = ["/form/create", "/form/all/:path*", "/my-page"];
  const onlyNonVerified = ["/login", "/register"];
  const token = req.cookies.get('token')?.value || "";

  if (onlyNonVerified.includes(path) && token) {
    return NextResponse.redirect(
      new URL('/', req.nextUrl)
    );
  }
  
  if (onlyVerified.includes(path) && !token) {
    return NextResponse.redirect(
      new URL('/login', req.nextUrl)
    );
  }
};

export const config = {
  matcher: [
    "/form/create",
    "/my-page",
    "/login",
    "/register",
    "/form/all/:path*"
  ]
};