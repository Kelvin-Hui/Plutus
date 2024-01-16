import {
  AUTH_URL,
  DEFAULT_REDIRECT_URL,
  authRoutes,
  privateRoutes,
} from '@/route';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isAuthRoutes = authRoutes.includes(pathname);
      const isPrivateRoutes = privateRoutes.includes(pathname);

      if (isLoggedIn) {
        if (isAuthRoutes) {
          return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
        }
        return true;
      } else {
        if (isPrivateRoutes) {
          return Response.redirect(new URL(AUTH_URL, nextUrl));
        }
        return true;
      }
    },
    async session({ session, token }) {
      session.user.username = token.user.username;
      session.user.id = token.user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (!token.user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
