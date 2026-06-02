import withPrisma from "@/lib/prisma";
import { requireAuth } from "@/middlewares/requireAuth";
import { Hono } from "hono";
import { commentsControllers } from "./controllers";
import { Env } from "@/types";

const commentRoutes = new Hono<Env>();

commentRoutes.use(withPrisma, requireAuth);

commentRoutes.post("/", commentsControllers.createComment);

commentRoutes.delete("/:commentId", commentsControllers.deleteComment);

export default commentRoutes;
