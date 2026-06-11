import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarksPostApi } from "./api";
import type { TFeedPost } from "../feed/api";
import toast from "react-hot-toast";
import type { TDetailPost } from "../detail/api";

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
    onMutate: async (postId) => {
      await qc.cancelQueries({ queryKey: ["post-detail", postId] });
      const prevPostDetail = qc.getQueryData<TDetailPost | undefined>([
        "post-detail",
        postId,
      ]);
      qc.setQueryData(
        ["post-detail", postId],
        (old: TDetailPost | undefined) => {
          if (!old) return undefined;
          return {
            ...old,
            isBookmarked: !old.isBookmarked,
          };
        },
      );

      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const prevPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.map((p) => {
          if (p.id !== postId) {
            return p;
          }
          return {
            ...p,
            isBookmarked: !p.isBookmarked,
            _count: {
              ...p._count,
              bookmarks: p.isBookmarked
                ? p._count.bookmarks - 1
                : p._count.bookmarks + 1,
            },
          };
        });
      });
      return { prevPosts, prevPostDetail };
    },
    onError: (err, postId, context) => {
      console.log(err);
      if (context?.prevPosts) {
        qc.setQueryData(["feed-posts"], context.prevPosts);
      }
      if (context?.prevPostDetail) {
        qc.setQueryData(["post-detail", postId], context.prevPostDetail);
      }
      toast.error("Failed to bookmark. Please try again.");
    },
  });
};
