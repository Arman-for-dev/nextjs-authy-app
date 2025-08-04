import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { users } from "./db/userSchema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Credentials({
            credentials:{
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const [ user ] = await db.select().from(users).where(eq(users.email, credentials.email as string))
                

                if(!user){
                    throw new Error("Incorrect credentials");
                }else {
                    if (!credentials.password || !user.password) {
                        throw new Error("Password is missing");
                    }
                    const passwordCorrent = await compare(String(credentials.password), String(user.password));
                    
                    if(!passwordCorrent){
                        throw new Error("Incorrect credentials!");
                    }
                }

                return {
                    id: user.id.toString(),
                    email: user.email
                }
            }
        })
    ]
});