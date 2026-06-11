import { requireAuth } from "#/middlewares/requireAuth.js";
import { Env } from "#/types.js";
import { Hono } from "hono";
import { postController } from "./controllers/index.js";

const postRoutes = new Hono<Env>();

postRoutes.get("/feed", requireAuth, postController.fetchFeedPosts);
postRoutes.get("/detail/:postId", postController.fetchPostDetail);
postRoutes.get("/profile/:userId", postController.fetchProfilePosts);
postRoutes.get(
  "/saved/profile/:userId",
  postController.fetchProfileBookmarkedPosts,
);
postRoutes.get(
  "/tagged/profile/:userId",
  postController.fetchProfileTaggedPosts,
);

postRoutes.post("/", requireAuth, postController.createPost);
postRoutes.post("/like", requireAuth, postController.likePost);
postRoutes.post("/repost", requireAuth, postController.repost);
postRoutes.post("/bookmark", requireAuth, postController.bookmarkPost);

postRoutes.delete("/:postId", requireAuth, postController.deletePost);

export default postRoutes;
