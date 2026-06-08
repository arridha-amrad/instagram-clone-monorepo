import { queryOptions } from "@tanstack/react-query";
import { fetchProfileTaggedPostsApi } from "./api";

export const profileTaggedPostsQueryOptions = (
  username: string,
  userId: string,
) =>
  queryOptions({
    queryKey: ["profile-posts", "tagged", username],
    queryFn: async () => {
      try {
        return fetchProfileTaggedPostsApi(userId);
      } catch (err) {
        throw err;
      }
    },
  });
