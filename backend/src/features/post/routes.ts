import { Hono } from "hono";
import { postController } from "./controllers";
import withPrisma from "@/lib/prisma";
import { requireAuth } from "@/middlewares/requireAuth";
import { Env } from "@/types";

const postRoutes = new Hono<Env>();

postRoutes.post("/", withPrisma, requireAuth, postController.createPost);
postRoutes.get("/feed", withPrisma, requireAuth, postController.fetchFeedPosts);
postRoutes.delete(
  "/:postId",
  withPrisma,
  requireAuth,
  postController.deletePost,
);
postRoutes.post("/like", withPrisma, requireAuth, postController.likePost);
postRoutes.post("/repost", withPrisma, requireAuth, postController.repost);
postRoutes.post(
  "/bookmark",
  withPrisma,
  requireAuth,
  postController.bookmarkPost,
);

export default postRoutes;
