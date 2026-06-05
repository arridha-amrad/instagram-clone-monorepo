import withPrisma from "#/lib/prisma.js";
import { Env } from "#/types.js";
import { Hono } from "hono";
import { usersControllers } from "./controllers/index.js";
import { requireAuth } from "#/middlewares/requireAuth.js";

const usersRoutes = new Hono<Env>();

usersRoutes.get(
  "/profile/:username",
  withPrisma,
  requireAuth,
  usersControllers.fetchProfile,
);

usersRoutes.post(
  "/profile",
  withPrisma,
  requireAuth,
  usersControllers.updateProfile,
);

usersRoutes.post("/follow", withPrisma, requireAuth, usersControllers.follow);

usersRoutes.get(
  "/suggested-users",
  withPrisma,
  requireAuth,
  usersControllers.fetchSuggestedUsers,
);

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
  "/search/histories/one/:id",
  withPrisma,
  requireAuth,
  usersControllers.deleteSearchHistory,
);

usersRoutes.delete(
  "/search/histories",
  withPrisma,
  requireAuth,
  usersControllers.deleteAllSearchHistories,
);

export default usersRoutes;
