import z from "zod";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export const userProfileSchema = z.object({
  name: z.string().min(3),
  location: z.string().optional(),
  web: z.string().optional(),
  gender: z.custom<Gender>().optional(),
  occupation: z.string().optional(),
  bio: z.string().optional(),
});

export type TUserProfileSchema = z.infer<typeof userProfileSchema>;
