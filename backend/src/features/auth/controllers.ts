import type { Context } from "hono";
import { usersService } from "./services";

export const authController = {
  getAuth: async (c: Context) => {
    try {
      const users = await usersService.findAll();
      return c.json({ success: true, data: users }, 200);
    } catch (error) {
      return c.json({ success: false, message: "Error fetching users" }, 500);
    }
  },

  signup: async (c: Context) => {
    try {
      const body = await c.req.json();
      const newUser = await usersService.create(body);
      return c.json({ success: true, data: newUser }, 201);
    } catch (error) {
      return c.json({ success: false, message: "Error creating user" }, 400);
    }
  },
};
