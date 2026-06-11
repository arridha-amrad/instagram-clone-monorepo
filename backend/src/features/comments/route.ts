import { requireAuth } from "#/middlewares/requireAuth.js";
import { Hono } from "hono";
import { commentsControllers } from "./controllers/index.js";
import { Env } from "#/types.js";

const commentRoutes = new Hono<Env>();

commentRoutes.get("/:postId", commentsControllers.fetchComments);

commentRoutes.post("/", requireAuth, commentsControllers.createComment);
commentRoutes.post("/like", requireAuth, commentsControllers.likeComment);

commentRoutes.delete(
  "/:commentId",
  requireAuth,
  commentsControllers.deleteComment,
);

export default commentRoutes;
