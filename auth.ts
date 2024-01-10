import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { fetchUserByUsername } from './app/lib/action';
import prisma from "./app/lib/prisma";
import { authConfig } from './auth.config';
import { LoginSchema } from './schema';


declare module "next-auth" {
  interface Session{
    user:{
      username : string;
      id : string;
      cash : number;
    } & DefaultSession['user']
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user? : User
  }
}


 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session : {strategy:"jwt"},
  adapter : PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials){
        const parsedCredentials = LoginSchema.safeParse(credentials)

        if(parsedCredentials.success){
          const {username, password} = parsedCredentials.data;
          const user = await fetchUserByUsername(username);
          if(!user) return null;
          
          const passwordMatch = await bcrypt.compare(password, user.password);

          if(passwordMatch) return user;
        }
        return null;
      }
    })
  ],
});