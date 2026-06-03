import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { likePost } from "./api";
import type { TFeedPost } from "../feed/api";

export const useLikePostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      try {
        return likePost(postId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const previousPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.map((p) => ({
          ...p,
          isLiked: !p.isLiked,
          _count: {
            ...p._count,
            postLikes: p.isLiked
              ? p._count.postLikes - 1
              : p._count.postLikes + 1,
          },
        }));
      });
      return { previousPosts };
    },
    onError: (err, __, context) => {
      console.log(err);
      if (context?.previousPosts) {
        qc.setQueryData(["feed-posts"], context.previousPosts);
      }
      toast.error("Failed to like. Please try again.");
    },
  });
};
