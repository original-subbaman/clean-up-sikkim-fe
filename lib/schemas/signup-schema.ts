import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(32, "Username must be at most 32 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
