import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const onlyVerified = ["/form/create"];
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
    // "/form/create",
    "/login",
    "/register",
  ]
};