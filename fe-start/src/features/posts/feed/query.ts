import { queryOptions } from "@tanstack/react-query";
import { fetchFeedPostsApi } from "./api";

export const feedPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["feed-posts"],
    queryFn: async () => {
      try {
        return fetchFeedPostsApi();
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
  });
