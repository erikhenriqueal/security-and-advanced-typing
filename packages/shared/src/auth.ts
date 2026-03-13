import { z } from "zod";

export const roleSchema = z.enum(
  ["viewer", "contributor", "manager", "admin"],
  "Invalid role",
);
export const nameSchema = z
  .string()
  .min(2, "Username must be at least 2 characters long")
  .max(50, "Username must be at most 50 characters long");
export const emailSchema = z.email("Invalid email address");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 128 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, $, %, &, *)",
  );

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
