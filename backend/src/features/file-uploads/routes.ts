import { Hono } from "hono";
import { fileUploadController } from "./controllers.js";
import { Env } from "@/types.js";

const fileRoutes = new Hono<Env>();

fileRoutes.delete("/:url", fileUploadController.removeFile);
fileRoutes.post("/", fileUploadController.createSignature);

export default fileRoutes;
