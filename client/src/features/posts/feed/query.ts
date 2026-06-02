import { queryOptions } from "@tanstack/react-query";
import { fetchFeedPosts } from "./api";

export const feedPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["feed-posts"],
    queryFn: async () => {
      try {
        return fetchFeedPosts();
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
