// import CredentialsProvider from "next-auth/providers/credentials";
// import type { AuthOptions } from "next-auth";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//    async authorize(credentials) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: credentials?.email,
//         password: credentials?.password,
//       }),
//     });

//     const data = await res.json();

//     // ✅ Expecting data in the shape of your provided example
//     if (res.ok && data?.data?.accessToken) {
//       return {
//         id: data.data.userId, 
//         accessToken: data.data.accessToken,
//         refreshToken: data.data.refreshToken,
//         email: data.data.email,
//         message: data.message,
//         success: data.success,
//         statusCode: data.statusCode,
//       };
//     }

//     return null;
//   } catch (error) {
//     console.error("Fetch login error:", error);
//     return null;
//   }
// }
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // Store user info in token
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.userId = user.userId;
//         token.email = user.email;
//         token.message = user.message;
//         token.success = user.success;
//         token.statusCode = user.statusCode;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Make session include full response
//       session.user = {
//         userId: token.userId,
//         email: token.email,
//       };
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       session.message = token.message;
//       session.success = token.success;
//       session.statusCode = token.statusCode;

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

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

          if (res.ok && data?.data?.accessToken) {
            return {
              id: data.data.userId,
              email: data.data.email,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              role: data.data.role, // 👈 Include role
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
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
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
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
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
