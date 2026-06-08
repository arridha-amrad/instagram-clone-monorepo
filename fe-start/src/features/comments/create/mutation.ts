import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TCreateCommentApiSchema } from "./schema";
import { createCommentApi } from "./api";
import toast from "react-hot-toast";
import type { TFeedPost } from "#/features/posts/feed/api";
import { authQueryOptions } from "#/features/auth/query";

export const useCreateCommentMutation = () => {
  const qc = useQueryClient();
  const { data } = useQuery(authQueryOptions());
  return useMutation({
    mutationFn: (body: TCreateCommentApiSchema) => {
      try {
        return createCommentApi(body);
      } catch (err) {
        throw err;
      }
    },
    onSuccess(newComment) {
      qc.setQueryData(["feed-posts"], (oldData: TFeedPost[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((p) => {
          if (p.id === newComment.postId) {
            return {
              ...p,
              _count: {
                ...p._count,
                comments: p._count.comments + 1,
              },
              comments: [
                {
                  id: newComment.id,
                  username: data?.user.username,
                  comment: newComment.content,
                  postId: newComment.postId,
                  userId: newComment.user.id,
                },
                ...(p.comments ? p.comments : []),
              ],
            };
          }
          return p;
        });
      });
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });
};
