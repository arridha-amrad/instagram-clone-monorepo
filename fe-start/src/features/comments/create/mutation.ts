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
    // onMutate: async ({ comment, postId }) => {
    //   if (!data) {
    //     throw redirect({ to: "/auth/login" });
    //   }
    //   await qc.cancelQueries({ queryKey: ["feed-posts"] });
    //   const randomId = crypto.randomUUID();
    //   const prevPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
    //   qc.setQueryData(["feed-posts"], (oldData: TFeedPost[] | undefined) => {
    //     if (!oldData) return [];
    //     return oldData.map((p) => {
    //       if (p.id === postId) {
    //         return {
    //           ...p,
    //           _count: {
    //             comments: p._count.comments + 1,
    //           },
    //           comments: [
    //             {
    //               id: randomId,
    //               postId: p.id,
    //               comment,
    //               userId: data.data?.user.id,
    //               username: data.data?.user.username,
    //             },
    //             ...p.comments,
    //           ],
    //         };
    //       }
    //       return p;
    //     });
    //   });
    //   return { prevPosts };
    // },
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
                  username: data?.data?.user.username,
                  comment: newComment.content,
                  postId: newComment.postId,
                  userId: newComment.user.id,
                },
                ...p.comments,
              ],
            };
          }
          return p;
        });
      });
    },
    onError: () => {
      // console.log(err);
      // if (context?.prevPosts) {
      //   qc.setQueryData(["feed-posts"], context.prevPosts);
      // }
      toast.error("Failed to post comment");
    },
  });
};
