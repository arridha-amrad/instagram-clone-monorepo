import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCommentApi } from "./api";
import type { TComment } from "../fetch/api";
import toast from "react-hot-toast";

export const useLikeCommentMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: string) => {
      try {
        return likeCommentApi(commentId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async (commentId: string) => {
      await qc.cancelQueries({ queryKey: ["comments", postId] });
      const prevComments = qc.getQueryData<TComment[] | undefined>([
        "comments",
        postId,
      ]);
      qc.setQueryData(["comments", postId], (old: TComment[] | undefined) => {
        if (!old) return [];
        return old.map((o) => {
          if (o.id !== commentId) return o;
          return {
            ...o,
            isLiked: !o.isLiked,
            _count: {
              ...o._count,
              commentLikes: o.isLiked
                ? o._count.commentLikes - 1
                : o._count.commentLikes + 1,
            },
          };
        });
      });
      return {
        prevComments,
      };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.prevComments) {
        qc.setQueryData(["comments", postId], context.prevComments);
      }
      toast.error("failed to like comment. Please try again.");
    },
  });
};
