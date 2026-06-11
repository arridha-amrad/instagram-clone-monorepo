import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repostApi } from "./api";
import toast from "react-hot-toast";
import type { TFeedPost } from "../feed/api";
import type { TDetailPost } from "../detail/api";

export const useRepostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      try {
        return await repostApi(postId);
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
            isRepost: !old.isRepost,
          };
        },
      );

      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const previousPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.map((p) => {
          if (p.id !== postId) return p;
          return {
            ...p,
            isRepost: !p.isRepost,
            _count: {
              ...p._count,
              reposts: p.isRepost ? p._count.reposts - 1 : p._count.reposts + 1,
            },
          };
        });
      });
      return { previousPosts, prevPostDetail };
    },
    onError: (err, postId, context) => {
      console.log(err);
      if (context?.previousPosts) {
        qc.setQueryData(["feed-posts"], context.previousPosts);
      }
      if (context?.prevPostDetail) {
        qc.setQueryData(["post-detail", postId], context.prevPostDetail);
      }
      toast.error("Failed to repost. Please try again.");
    },
  });
};
