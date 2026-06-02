import { MyApiError } from "../errors.js";
import { Context } from "hono";
import { Env } from "../types.js";

export const errorHandler = (err: unknown, c: Context<Env>): Response => {
  if (err instanceof MyApiError) {
    return c.json({ success: false, message: err.message }, err.statusCode);
  }
  if (err instanceof Error) {
    return c.json({ success: false, message: err.message }, 400 as const);
  }
  return c.json(
    { success: false, message: "Something went wrong" },
    500 as const,
  );
};
