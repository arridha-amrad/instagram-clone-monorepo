import { MyApiError } from "#/errors.js";
import { Env } from "#/types.js";
import { Context } from "hono";
import { errorHandler } from "../../utils.js";
import { TUserProfileSchema } from "../zod-schema.js";
import fetchProfile from "./fetch-profile.js";
import fetchSuggestedUsers from "./fetch-suggested-users.js";
import follow from "./follow.js";
import addToSearchHistory from "./search-user/add-to-search-history.js";
import {
  deleteAllSearchHistories,
  deleteSearchHistory,
} from "./search-user/delete-search-histories.js";
import fetchSearchHistories from "./search-user/fetch-search-histories.js";
import searchUser from "./search-user/search-user.js";
import updateBackgroundWallpaper from "./update-background.js";
import updateProfile from "./update-profile.js";

export const usersControllers = {
  updateBackgroundWallpaper: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      const formData = await c.req.formData();
      const file = formData.get("file") as File;
      if (!file) throw new MyApiError("file is missing", 400);
      if (!user) throw new MyApiError("unauthorized", 401);
      const result = await updateBackgroundWallpaper(prisma, user.id, file);
      return c.json({ success: true, data: result });
    } catch (err) {
      return errorHandler(err, c);
    }
  },
  fetchProfile: async (c: Context<Env>) => {
    try {
      const username = c.req.param("username");
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user || !username) {
        throw new MyApiError("missing parameter", 400);
      }
      const result = await fetchProfile(prisma, username, user?.id);
      return c.json({ success: true, data: result }, 200);
    } catch (err) {
      return errorHandler(err, c);
    }
  },
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
  updateProfile: async (c: Context<Env>) => {
    try {
      const data = (await c.req.json()) as TUserProfileSchema;
      const prisma = c.get("prisma");
      const user = c.get("user");
      if (!user) {
        throw new MyApiError("unauthorized", 401);
      }
      const result = await updateProfile(prisma, user.id, data);
      return c.json({ success: true, data: result });
    } catch (err) {
      return errorHandler(err, c);
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
  follow: async (c: Context<Env>) => {
    try {
      const prisma = c.get("prisma");
      const user = c.get("user");
      const { targetId } = (await c.req.json()) as { targetId: string };
      console.log({ targetId });
      if (!targetId || !prisma || !user)
        throw new MyApiError("missing params", 400);
      const result = await follow(prisma, user.id, targetId);
      return c.json({ success: true, data: result });
    } catch (err) {
      return errorHandler(err, c);
    }
  },
};
