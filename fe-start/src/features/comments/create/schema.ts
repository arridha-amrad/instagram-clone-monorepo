import z from "zod";

const commentSchema = z
  .string()
  .trim()
  .min(1, "Cannot be empty")
  .max(200, "Cannot be longer than 200 characters");

export const createCommentFormSchema = z.object({
  comment: commentSchema,
});

export const createCommentApiSchema = z.object({
  postId: z.string().min(1, "postId is required"),
  comment: commentSchema,
});

export type TCreateCommentSchema = z.infer<typeof createCommentFormSchema>;
export type TCreateCommentApiSchema = z.infer<typeof createCommentApiSchema>;
