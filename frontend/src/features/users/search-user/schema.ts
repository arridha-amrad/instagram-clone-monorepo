import z from "zod";

export const searchSchema = z.object({
  username: z.string().min(1),
});

export type TSearchSchema = z.infer<typeof searchSchema>;
