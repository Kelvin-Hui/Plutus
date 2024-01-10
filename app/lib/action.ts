'use server'

import { signIn } from "@/auth";
import { LoginSchema, RegisterSchema } from "@/schema";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import prisma from "./prisma";


export async function login(values : z.infer<typeof LoginSchema>){
  const parsedCredentials = LoginSchema.safeParse(values);
  if(!parsedCredentials.success){
    return {error : "Invalid Credentials"};
  }

  const creadentials = parsedCredentials.data;

  const existingUser = await fetchUserByUsername(creadentials.username)
  if(!existingUser) return {error : "User Does Not Exist!"};

  try{
    await signIn('credentials', creadentials)
  }catch(error){
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error : 'Invalid credentials. Please try again.'};
        default:
          return {error : 'Something went wrong.'};
      }
    }
    throw error;
  }
}

export async function signup(values : z.infer<typeof RegisterSchema>){
  const parsedCredentials = RegisterSchema.safeParse(values);
  if(!parsedCredentials.success){
    return {error : "Invalid Formats!"};
  }

  const {username, password} = parsedCredentials.data;
  const existingUser = await fetchUserByUsername(username);
  if(existingUser) return {error : "Username Already In Use! Please Pick A New One"}

  await createUser(username, password);
  return {success : "User Created 🎉 Redirecting You To Dashboard ..."}
}


export async function fetchUserByUsername(username : string): Promise<User | null>{
  const user = await prisma.user.findUnique({
      where:{
          username: username
      },
  })
  return user
}


export async function createUser(username : string, password : string){
  try{
    await prisma.user.create(
      {
        data : {
          username : username,
          password : await bcrypt.hash(password, 10),
          cash : 25000.00,
          wathchList:{
            createMany:{
              data:[
                {symbol : "META"},
                {symbol : "AMZN"},
                {symbol : "AAPL"},
                {symbol : "GOOG"},
                {symbol : "NFLX"},
                {symbol : "SPY"},
              ]
            }
          },
          values:{
            create:{
              balance : 25000
            }
          },
        }
      }
    )
    return true;
  } catch(error){
    console.log(error);
    throw error;
  }
}