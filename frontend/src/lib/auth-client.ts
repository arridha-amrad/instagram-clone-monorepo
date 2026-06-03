import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { env } from "@/config/env";

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_BASE_URL,
  plugins: [usernameClient()],
});
