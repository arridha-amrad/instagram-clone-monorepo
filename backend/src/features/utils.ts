import { MyApiError } from "@/errors";
import { Env } from "@/types";
import { Context } from "hono";

export const errorHandler = (err: unknown, c: Context<Env>): Response => {
  if (err instanceof MyApiError) {
    return c.json({ success: false, message: err.message }, err.statusCode);
  }
  if (err instanceof Error) {
    console.log("instance err");
    return c.json({ success: false, message: err.message }, 400 as const);
  }
  console.log("not instance err");
  return c.json(
    { success: false, message: "Something went wrong" },
    500 as const,
  );
};
