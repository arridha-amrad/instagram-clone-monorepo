import { Hono } from "hono";
import { authController } from "./controllers";

const usersRoutes = new Hono();

usersRoutes.get("/", authController.getAuth);
usersRoutes.post("/", authController.signup);

export default usersRoutes;
