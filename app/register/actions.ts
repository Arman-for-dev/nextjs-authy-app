"use server";

import db from "@/db";
import { users } from "@/db/userSchema";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { hash } from "bcryptjs";
import { z } from "zod";


export const registerUser = async ({
    email,
    password,
    confirmPassword
}:{
    email:string,
    password:string,
    confirmPassword:string
}) =>{

    try {
        
        const newUserSchema = z.object({
            email: z.string().email()
        }).and(passwordMatchSchema);

        const newUserValidation = newUserSchema.safeParse({
            email,
            password,
            confirmPassword
        });
        if(!newUserValidation.success){
            return {
                error: true,
                message: newUserValidation.error.issues[0]?.message ?? "An error occurred"
            }
        }

        const hashedPassword = await hash(password, 10);

        await db.insert(users).values({
            email,
            password: hashedPassword
        });
    } catch (e: any) {
        if (e.code === "23505") {
            return {
                error: true,
                message: "An account is already register with this email!"
            }
        }
        
        return {
            error: true,
            message:"An error occured!"
        }
    }
}