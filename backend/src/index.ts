import "dotenv/config";

import { Hono } from "hono";
import { logger } from "hono/logger";
import withPrisma from "./lib/prisma";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import fileRoutes from "./features/file-uploads/routes";
import { Env } from "./types";
import postRoutes from "./features/post/routes";
import usersRoutes from "./features/users/routes";
import { env } from "@/config/env";
import commentRoutes from "./features/comments/route";

const app = new Hono<Env>();

app.use("*", logger());

app.use(
  "/api/*",
  cors({
    origin: env.ORIGIN_BASE_URL!,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Middleware Session Checking
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
  } else {
    c.set("user", session.user);
    c.set("session", session.session);
  }
  await next();
});

app.get("/", (c) => {
  return c.text("Hello There!");
});

app.get("/test-prisma", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.todo.findMany();
  return c.json({ users });
});

app.route("/api/file", fileRoutes);
app.route("/api/posts", postRoutes);
app.route("/api/users", usersRoutes);
app.route("/api/comments", commentRoutes);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
