import { z } from "zod";
export declare const signupformat: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username?: string | undefined;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    username?: string | undefined;
    name?: string | undefined;
}>;
export declare const BlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updatebloginput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    userId: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type Signupformat = z.infer<typeof signupformat>;
export type BlogInputtype = z.infer<typeof BlogInput>;
export type UpdateblogInputType = z.infer<typeof updatebloginput>;
