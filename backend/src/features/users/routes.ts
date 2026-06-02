import withPrisma from "@/lib/prisma";
import { Env } from "@/types";
import { Hono } from "hono";
import { usersControllers } from "./controllers";
import { requireAuth } from "@/middlewares/requireAuth";

const usersRoutes = new Hono<Env>();

usersRoutes.get("/search", withPrisma, usersControllers.searchUser);

usersRoutes.post(
  "/search/histories",
  withPrisma,
  requireAuth,
  usersControllers.addToSearchHistory,
);

usersRoutes.get(
  "/search/histories",
  withPrisma,
  requireAuth,
  usersControllers.fetchSearchHistories,
);

usersRoutes.delete(
  "/search/hitories/one/:id",
  withPrisma,
  requireAuth,
  usersControllers.deleteSearchHistory,
);

usersRoutes.delete(
  "/search/hitories",
  withPrisma,
  requireAuth,
  usersControllers.deleteAllSearchHistories,
);

export default usersRoutes;
