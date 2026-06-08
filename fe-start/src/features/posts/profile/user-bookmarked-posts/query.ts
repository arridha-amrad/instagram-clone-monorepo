import { queryOptions } from "@tanstack/react-query";
import { fetchProfileBookmarkedPosts } from "./api";

export const profileBookmarkedPostsQueryOptions = (
  username: string,
  userId: string,
) =>
  queryOptions({
    queryKey: ["profile-posts", "bookmarked", username],
    queryFn: async () => {
      try {
        return fetchProfileBookmarkedPosts(userId);
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5 * 60 * 100,
  });
