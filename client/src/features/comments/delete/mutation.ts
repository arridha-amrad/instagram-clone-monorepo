import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "./api";
import type { TFeedPost } from "#/features/posts/feed/api";
import toast from "react-hot-toast";

export const useDeleteCommentMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: string) => {
      try {
        return deleteCommentApi(commentId);
      } catch (err) {
        throw err;
      }
    },
    async onMutate(commentId) {
      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const prevPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (oldData: TFeedPost[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              _count: {
                comments: p._count.comments - 1,
              },
              comments: p.comments.filter((c) => c.id !== commentId),
            };
          }
          return p;
        });
      });
      return { prevPosts };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.prevPosts) {
        qc.setQueryData(["feed-posts"], context.prevPosts);
      }
      toast.error("Failed to delete comment");
    },
  });
};
