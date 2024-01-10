import * as z from "zod";

export const LoginSchema = z.object({
    username : z.string().min(1, {
        message : "Username is required."
    }),
    password : z.string().min(1, {
        message : "Password is required."
    })
})

export const RegisterSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
})