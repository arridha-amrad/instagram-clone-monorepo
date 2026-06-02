import withPrisma from "@/lib/prisma.js";
import { requireAuth } from "@/middlewares/requireAuth.js";
import { Hono } from "hono";
import { commentsControllers } from "./controllers/index.js";
import { Env } from "@/types.js";

const commentRoutes = new Hono<Env>();

commentRoutes.use(withPrisma, requireAuth);

commentRoutes.post("/", commentsControllers.createComment);

commentRoutes.delete("/:commentId", commentsControllers.deleteComment);

export default commentRoutes;
