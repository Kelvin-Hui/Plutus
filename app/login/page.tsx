'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
})

export default function LoginPage(){
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values);
        router.push("/dashboard")
    }

    return(
        <div className="h-screen items-center flex justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col items-center justify-center">
                            <ArrowTrendingUpIcon className="h-24 w-24"/>
                            <h1 className="text-8xl font-bold font-sanif">Plutus</h1>
                            <span className="text-lg text-muted-foreground">Welcome! Sign In To Continue</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>

               
            <Tabs defaultValue="Login">
                <TabsList className="grid grid-cols-2 w-[500px] mb-8">
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="Signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="Login">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="Signup">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This will be your public display name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">Sign up</Button>
                    </form>
                    </Form>
                </TabsContent>
            </Tabs>
            </CardContent>
            </Card>
       </div>
    )
}