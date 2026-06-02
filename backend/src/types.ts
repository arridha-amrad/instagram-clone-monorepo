import { PrismaClient } from "./generated/prisma/client.js";
import { auth } from "./lib/auth.js";

export type Env = {
  Variables: {
    prisma: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
};
