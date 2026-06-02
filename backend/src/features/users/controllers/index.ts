import { Env } from "@/types";
import { Context } from "hono";
import searchUser from "./search-user";
import { MyApiError } from "@/errors";
import { errorHandler } from "../../utils";
import addToSearchHistory from "./add-to-search-history";
import fetchSearchHistories from "./fetch-search-histories";
import {
  deleteAllSearchHistories,
  deleteSearchHistory,
} from "./delete-search-histories";

export const usersControllers = {
  searchUser: async (c: Context<Env>) => {
    try {
      const query = c.req.query("q");
      const prisma = c.get("prisma");
      if (!query) {
        throw new MyApiError("missing parameter", 400);
      }
      const users = await searchUser(prisma, query);
      return c.json({ success: true, data: users }, 200);
    } catch (error) {
      return errorHandler(error, c);
    }
  },
  addToSearchHistory: async (c: Context<Env>) => {
    try {
      const { targetId } = (await c.req.json()) as { targetId: string };
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user) {
        throw new MyApiError("unauthorized", 401);
      }
      const result = await addToSearchHistory(prisma, user?.id, targetId);
      return c.json({ success: true, data: result });
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  fetchSearchHistories: async (c: Context<Env>) => {
    try {
      const user = c.get("user");
      const prisma = c.get("prisma");
      if (!user) throw new MyApiError("unauthorized", 401);
      const result = await fetchSearchHistories(prisma, user.id);
      return c.json({ success: true, data: result }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  deleteSearchHistory: async (c: Context<Env>) => {
    try {
      const id = c.req.param("id");
      if (!id) throw new MyApiError("missing param", 400);
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user) throw new MyApiError("unauthorized", 401);
      const result = await deleteSearchHistory(prisma, id);
      return c.json({ success: true, data: result }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  deleteAllSearchHistories: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user) throw new MyApiError("unauthorized", 401);
      const result = await deleteAllSearchHistories(prisma, user.id);
      return c.json({ success: true, data: result }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
};
