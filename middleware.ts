import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const role = token?.role;
    const path = req.nextUrl.pathname;

    // User dashboard protection
    if (path.startsWith("/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Contractor/Service Provider dashboard protection
    if (path.startsWith("/service-provider") && role !== "contractor") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Admin dashboard protection 
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
     
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/user/:path*",
    "/contractor/:path*",
    "/admin/:path*",
  ],
};
