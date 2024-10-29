import { z } from "zod";

export const signupformat = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3).max(20).optional(),
    name: z.string().optional(),
});

export const BlogInput = z.object({
    title: z.string(),
    content: z.string(),
});

export const updatebloginput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    userId: z.string(),
});


export type Signupformat = z.infer<typeof signupformat>;
export type BlogInputtype = z.infer<typeof BlogInput>;
export type UpdateblogInputType = z.infer<typeof updatebloginput>;