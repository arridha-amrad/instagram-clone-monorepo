import { queryOptions } from "@tanstack/react-query";
import { fetchProfilePostsApi } from "./api";

export const profilePostsQueryOptions = (username: string, userId: string) =>
  queryOptions({
    queryKey: ["profile-posts", username],
    queryFn: async () => {
      try {
        return fetchProfilePostsApi(userId);
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 100,
  });
