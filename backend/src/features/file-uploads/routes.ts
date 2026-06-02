import { Hono } from "hono";
import { fileUploadController } from "./controllers";
import { Env } from "@/types";

const fileRoutes = new Hono<Env>();

fileRoutes.delete("/:url", fileUploadController.removeFile);
fileRoutes.post("/", fileUploadController.createSignature);

export default fileRoutes;
