import { Env } from "@/types";
import { MiddlewareHandler } from "hono";

export const requireAuth: MiddlewareHandler<Env> = async (c, next) => {
  const user = c.get("user");
  if (!user) {
    return c.json(
      {
        success: false,
        message: "Unauthorized. Please login",
      },
      401,
    );
  }
  await next();
};
