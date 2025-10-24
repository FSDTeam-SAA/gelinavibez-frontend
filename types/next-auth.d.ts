import NextAuth, { DefaultSession } from "next-auth";

// ✅ Extend the built-in session and user types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userId: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
      profileImage?: string;
    };
    accessToken: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }

  interface User {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    accessToken: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }
}

// ✅ Extend JWT token interface
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }
}
