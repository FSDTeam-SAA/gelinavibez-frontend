import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          // ✅ Adjusted to match your actual API response shape
          if (res.ok && data?.data?.accessToken && data?.data?.user) {
            const user = data.data.user;

            return {
              id: user._id,
              email: user.email,
              role: user.role, // ✅ role now comes from data.data.user.role
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.profileImage,
              accessToken: data.data.accessToken,
              message: data.message,
              success: data.success,
              statusCode: data.statusCode,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profileImage = user.profileImage;
        token.message = user.message;
        token.success = user.success;
        token.statusCode = user.statusCode;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        userId: token.userId as string,
        email: token.email as string,
        role: token.role as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        profileImage: token.profileImage as string,
      };
      session.accessToken = token.accessToken as string;
      session.message = token.message as string;
      session.success = token.success as boolean;
      session.statusCode = token.statusCode as number;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
