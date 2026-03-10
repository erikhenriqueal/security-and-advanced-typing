import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 128 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, $, %, &, *)",
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
