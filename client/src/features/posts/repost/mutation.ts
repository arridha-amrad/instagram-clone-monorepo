import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repostApi } from "./api";
import toast from "react-hot-toast";
import type { TFeedPost } from "../feed/api";

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
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const previousPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.map((p) => ({
          ...p,
          isRepost: !p.isRepost,
          _count: {
            ...p._count,
            reposts: p.isRepost ? p._count.reposts - 1 : p._count.reposts + 1,
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
      toast.error("Failed to repost. Please try again.");
    },
  });
};
