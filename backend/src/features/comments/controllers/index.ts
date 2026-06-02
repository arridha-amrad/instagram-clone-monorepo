import { errorHandler } from "@/features/utils";
import { Env } from "@/types";
import { Context } from "hono";
import createComment from "./create-comment";
import { deleteComment } from "./delete-comment";

export const commentsControllers = {
  createComment: async (c: Context<Env>) => {
    try {
      const { postId, comment } = (await c.req.json()) as {
        postId: string;
        comment: string;
      };
      const user = c.get("user");
      if (!postId || !comment || !user) {
        throw new Error("Missing parameter");
      }
      const prisma = c.get("prisma");
      const newComment = await createComment(prisma, postId, user.id, comment);
      return c.json({ success: true, data: newComment }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  deleteComment: async (c: Context<Env>) => {
    try {
      const commentId = c.req.param("commentId");
      const user = c.get("user");
      if (!commentId || !user) {
        throw new Error("Missing parameter");
      }
      const prisma = c.get("prisma");
      const deletedComment = await deleteComment(prisma, commentId, user.id);
      return c.json({ success: true, data: deletedComment }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
};
