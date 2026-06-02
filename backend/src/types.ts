import type { PrismaClient } from "./generated/prisma/client";
import { auth } from "./lib/auth";

export type Env = {
  Variables: {
    prisma: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
};
