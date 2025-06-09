import type { Provider } from "next-auth/providers";

// @ts-ignore
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma/prisma";
import { signInSchema } from "@/model/SignIn.model";
import { User } from "@/model/User.model";
import s from "@/service/app.services";

declare module "next-auth" {
  interface Session {
    user: {
      isCritic?: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    isCritic?: boolean;
  }
  interface JWT {
    isCritic?: boolean;
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      try {
        //const { email, password } = signInSchema.parse(credentials);
        const { email, password } = credentials;

        const user: User = await s.auth.signin(email as string, password as string);

        if (!user) throw new Error("Invalid credentials");

        return user;
      } catch (error) {
        if (error instanceof ZodError) {
          return null;
        }

        return null; // Ensure no undefined is returned
      }
    },
  }),
];

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      try {
        if (user) token.isCritic = user.isCritic;

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);

        return token; // Return the token even if there's an error
      }
    },
    // @ts-ignore
    async session({ session, token }) {
      try {
        if (token) session.user.isCritic = token.isCritic;

        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);

        return session; // Return the session even if there's an error
      }
    },
  },
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
});
