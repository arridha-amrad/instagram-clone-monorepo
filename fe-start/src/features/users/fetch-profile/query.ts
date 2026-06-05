import { queryOptions } from "@tanstack/react-query";
import { fetchProfileApi } from "./api";

export const userProfileQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ["profile", username],
    queryFn: async () => {
      try {
        return fetchProfileApi({ data: username });
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
