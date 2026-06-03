import { authClient } from "#/lib/auth-client";
import { queryOptions } from "@tanstack/react-query";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        return await authClient.getSession();
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
