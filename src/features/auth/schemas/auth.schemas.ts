import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  username: z.string().trim().toLowerCase().min(4).max(12),
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export type RegisterSchemaDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export type LoginSchemaDTO = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export type ForgotPasswordSchemaDTO = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  oldPassword: z.string().trim().min(8),
  newPassword: z.string().trim().min(8),
});

export type ResetPasswordSchemaDTO = z.infer<typeof resetPasswordSchema>;
