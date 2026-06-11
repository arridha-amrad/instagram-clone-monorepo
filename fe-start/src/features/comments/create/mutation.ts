import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TCreateCommentApiSchema } from "./schema";
import { createCommentApi } from "./api";
import toast from "react-hot-toast";
import type { TFeedPost } from "#/features/posts/feed/api";
import { authQueryOptions } from "#/features/auth/query";
import type { TComment } from "../fetch/api";

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
      // POST DETAIL
      qc.setQueryData(
        ["comments", newComment.postId],
        (old: TComment[] | undefined) => {
          if (!old) return [];

          const c: TComment = {
            id: newComment.id,
            content: newComment.content,
            createdAt: newComment.createdAt,
            isLiked: false,
            parentId: newComment.parentId,
            user: newComment.user,
            postId: newComment.postId,
            _count: {
              childComments: 0,
              commentLikes: 0,
            },
            childComments: [],
          };

          if (newComment.parentId) {
            return old.map((o) =>
              o.id === c.parentId
                ? {
                    ...o,
                    _count: {
                      ...o._count,
                      childComments: o._count.childComments + 1,
                    },
                    childComments: [
                      ...(o.childComments ? o.childComments : []),
                      c,
                    ],
                  }
                : o,
            );
          } else {
            return [c, ...old];
          }
        },
      );

      // FEED POSTS
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
