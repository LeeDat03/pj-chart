import { z } from "zod";
import { UserRole } from "../models/User";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z.email({ message: "Please provide valid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    role: z.enum(UserRole).optional().default(UserRole.USER),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email({ message: "Email is required" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
