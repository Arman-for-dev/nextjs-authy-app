"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z}  from "zod";
import { registerUser } from "./actions";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email()
}).and(passwordMatchSchema);

const handleSubmit = async (data: z.infer<typeof formSchema>) =>{
    const response = await registerUser({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
    });

    console.log(response)
}

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email:"",
        password:"",
        confirmPassword:""
    }
  });
  
  return (
    <main className="flex justify-center items-center min-h-screen">
        {form.formState.isSubmitSuccessful ? (
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/login">
                                Login in to your account
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Register for a new User
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <fieldset disabled={form.formState.isSubmitting}  className="flex flex-col gap-2"> 
                                <FormField control={form.control} name="email" render={({field})=> (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="password" render={({field})=> (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="confirmPassword" render={({field})=> (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button className="cursor-pointer" type="submit">Register</Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        )}
    </main>
  )
}

export default Register;