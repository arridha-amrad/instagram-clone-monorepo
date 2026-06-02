import { errorHandler } from "@/features/utils";
import { Env } from "@/types";
import { Context } from "hono";
import { bookmarkPost } from "./bookmark-post";
import createPost from "./create-post";
import { TCreatePostSchema } from "./create-post/schema";
import { deletePost } from "./delete-post";
import { fetchFeedPosts } from "./feed-posts";
import { likePost } from "./like-post";
import { repost } from "./repost";

export const postController = {
  createPost: async (c: Context<Env>) => {
    try {
      const body = (await c.req.json()) as TCreatePostSchema;
      const user = c.get("user");
      const prisma = c.get("prisma");
      const newPost = await createPost(prisma, body, user!.id);
      return c.json({ success: true, data: newPost }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  fetchFeedPosts: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      const posts = await fetchFeedPosts(prisma, user?.id);
      return c.json({ success: true, data: posts }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  deletePost: async (c: Context<Env>) => {
    try {
      const postId = c.req.param("postId");
      if (!postId) {
        throw new Error("Missing postId parameter");
      }
      const user = c.get("user"); // user telah melewati require auth
      const prisma = c.get("prisma");
      const post = await deletePost(prisma, user!.id, postId);
      return c.json({ success: true, data: post }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  likePost: async (c: Context<Env>) => {
    try {
      const { postId } = (await c.req.json()) as { postId: string };
      if (!postId) {
        throw new Error("Missing postId parameter");
      }
      const user = c.get("user");
      const prisma = c.get("prisma");
      const post = await likePost(prisma, user!.id, postId);
      return c.json({ success: true, data: post }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  repost: async (c: Context<Env>) => {
    try {
      const user = c.get("user");
      const prisma = c.get("prisma");
      const { postId } = (await c.req.json()) as { postId: string };
      if (!postId || !user) {
        throw new Error("Missing parameter");
      }
      const isRepost = await repost(prisma, postId, user.id);
      return c.json({ success: true, data: isRepost }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  bookmarkPost: async (c: Context<Env>) => {
    try {
      const { postId } = (await c.req.json()) as { postId: string };
      const user = c.get("user");
      if (!postId || !user) {
        throw new Error("Missing postId parameter");
      }
      const prisma = c.get("prisma");
      const isSaved = await bookmarkPost(prisma, postId, user.id);
      return c.json({ success: true, data: isSaved }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
};
