import "dotenv/config";
import type { Context, Next } from "hono";
import { PrismaClient } from "../generated/prisma/client.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "@/config/env";

const databaseUrl = env.DATABASE_URL_ACC;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const prisma = new PrismaClient({
  accelerateUrl: databaseUrl,
}).$extends(withAccelerate());

function withPrisma(c: Context, next: Next) {
  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }
  return next();
}

export default withPrisma;
