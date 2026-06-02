import z from "zod";

export const pwdSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character",
  );

export const loginSchema = z.object({
  identifier: z.string().min(1, "Please insert email or username"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const forgotpwdSchema = z.object({
  email: z.email("Invalid email"),
});

export type TForgotPwdSchema = z.infer<typeof forgotpwdSchema>;

export const resetpwdSchema = z
  .object({
    password: pwdSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TResetPwdSchema = z.infer<typeof resetpwdSchema>;

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    username: z
      .string()
      .min(1, "Username is required")
      .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    // Note: Uniqueness check happens during form submission/DB query

    email: z.email("Invalid email"),

    password: pwdSchema,

    avatar: z.any().optional(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const verificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  email: z.email("Invalid email format"),
});

export type TVerificationSchema = z.infer<typeof verificationSchema>;
