import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarksPostApi } from "./api";
import type { TFeedPost } from "../feed/api";
import toast from "react-hot-toast";

export const useBookmarkPostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      try {
        return bookmarksPostApi(postId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const prevPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.map((p) => ({
          ...p,
          isBookmarked: !p.isBookmarked,
          _count: {
            ...p._count,
            bookmarks: p.isBookmarked
              ? p._count.bookmarks - 1
              : p._count.bookmarks + 1,
          },
        }));
      });
      return { prevPosts };
    },
    onError: (err, __, context) => {
      console.log(err);
      if (context?.prevPosts) {
        qc.setQueryData(["feed-posts"], context.prevPosts);
      }
      toast.error("Failed to bookmark. Please try again.");
    },
  });
};
