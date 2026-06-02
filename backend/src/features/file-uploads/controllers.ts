import { Context } from "hono";
import { createSignature, removeFile } from "@/lib/cloudinaryFn";

export const fileUploadController = {
  createSignature: async (c: Context) => {
    try {
      const body = await c.req.json();
      const signature = await createSignature({ folder: body.folder });
      return c.json({ success: true, data: signature }, 200);
    } catch (error) {
      return c.json(
        { success: false, message: "Error fetching signature" },
        500,
      );
    }
  },

  removeFile: async (c: Context) => {
    try {
      const url = c.req.param("url");
      if (!url) {
        return c.json({ success: false, message: "URL tidak ditemukan" }, 400);
      }
      await removeFile(url);
      return c.json({ success: true, message: "removed" }, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "failed to remove file",
          error: error instanceof Error ? error.message : String(error),
        },
        500,
      );
    }
  },
};
