import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path == "/form/all") {
    return;
  }

  const onlyVerified = [
    /^\/form\/create$/,
    /^\/form\/all(\/[^\/]+)?$/,
    /^\/my-page$/
  ];
  const onlyNonVerified = [
    /^\/login$/,
    /^\/register$/
  ];

  const token = req.cookies.get('token')?.value || "";
  console.log("########## url:", path, "token:", token)
  
  const isOnlyVerifiedPath = onlyVerified.some(route => route.test(path));
  const isOnlyNonVerifiedPath = onlyNonVerified.some(route => route.test(path));

  if (isOnlyNonVerifiedPath && token) {
    return NextResponse.redirect(
      new URL('/', req.url)
    );
  }
  
  if (isOnlyVerifiedPath && !token) {
    console.log("해당 페이지에 접근 권한이 없습니다.")
    return NextResponse.redirect(
      new URL('/login', req.url)
    );
  }
};

export const config = {
  matcher: [
    "/form/create",
    "/form/all/:path*",
    "/my-page",
    "/login",
    "/register",
  ]
};