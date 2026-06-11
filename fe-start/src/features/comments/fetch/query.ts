import { queryOptions } from "@tanstack/react-query";
import { fetchCommentsApi } from "./api";

export const commentsQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        return fetchCommentsApi({ data: postId });
      } catch (err) {
        throw err;
      }
    },
  });
