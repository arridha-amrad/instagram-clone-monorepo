import { Hono } from "hono";
import { postController } from "./controllers/index.js";
import withPrisma from "#/lib/prisma.js";
import { requireAuth } from "#/middlewares/requireAuth.js";
import { Env } from "#/types.js";

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

postRoutes.get(
  "/profile/:userId",
  withPrisma,
  postController.fetchProfilePosts,
);
postRoutes.get(
  "/saved/profile/:userId",
  withPrisma,
  postController.fetchProfileBookmarkedPosts,
);

export default postRoutes;
