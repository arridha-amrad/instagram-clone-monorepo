import { queryOptions } from "@tanstack/react-query";
import { fetchPostDetailApi } from "./api";

export const postDetailQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post-detail", postId],
    queryFn: async () => {
      try {
        return fetchPostDetailApi({data: postId});
      } catch (err) {
        throw err;
      }
    },
  });
