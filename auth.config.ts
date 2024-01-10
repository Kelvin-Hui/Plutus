import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages:{
        signIn : '/login'
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
        async session({session, token}){
          session.user.username = token.user.username;
          session.user.id = token.user.id;
          return session
        },
        async jwt({token, user}){
          if(!token.user){
            token.user = user;
          }
          return token;
        }
      },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;