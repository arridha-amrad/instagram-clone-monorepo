import { Env } from "#/types.js";
import { Context } from "hono";
import searchUser from "./search-user/search-user.js";
import { MyApiError } from "#/errors.js";
import { errorHandler } from "../../utils.js";
import addToSearchHistory from "./search-user/add-to-search-history.js";
import fetchSearchHistories from "./search-user/fetch-search-histories.js";
import {
  deleteAllSearchHistories,
  deleteSearchHistory,
} from "./search-user/delete-search-histories.js";
import fetchSuggestedUsers from "./fetch-suggested-users.js";

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
  fetchSuggestedUsers: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user) throw new MyApiError("unauthorized", 401);
      const users = await fetchSuggestedUsers(prisma, user.id);
      return c.json({ success: true, data: users });
    } catch (err) {
      return errorHandler(err, c);
    }
  },
};
