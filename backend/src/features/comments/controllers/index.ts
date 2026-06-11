import { errorHandler } from "#/features/utils.js";
import { Env } from "#/types.js";
import { Context } from "hono";
import createComment from "./create-comment.js";
import { deleteComment } from "./delete-comment.js";
import fetchComments from "./fetch-comments.js";
import { MyApiError } from "#/errors.js";
import likeComment from "./like-comment.js";

export const commentsControllers = {
  likeComment: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      const { commentId } = (await c.req.json()) as {
        commentId: string;
      };
      if (!commentId) throw new MyApiError("missing param", 400);
      const result = await likeComment(prisma, commentId, user!.id);
      return c.json({ success: true, data: result }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  fetchComments: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      const postId = c.req.param("postId");
      if (!postId) throw new MyApiError("missing param postId", 400);
      const comments = await fetchComments(prisma, postId, user?.id);
      return c.json({ success: true, data: comments }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  createComment: async (c: Context<Env>) => {
    try {
      const { postId, comment, commentParentId } = (await c.req.json()) as {
        postId: string;
        comment: string;
        commentParentId?: string;
      };
      const user = c.get("user");
      if (!postId || !comment || !user) {
        throw new Error("Missing parameter");
      }
      const prisma = c.get("prisma");
      const newComment = await createComment(
        prisma,
        postId,
        user.id,
        comment,
        commentParentId,
      );
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
