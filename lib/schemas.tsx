"use client";

import {z} from 'zod';

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
});
