import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "./api";
import type { TFeedPost } from "../feed/api";
import toast from "react-hot-toast";

export const useDeletePostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => {
      try {
        return deletePostApi(postId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async (variables) => {
      await qc.cancelQueries({ queryKey: ["feed-posts"] });
      const previousPosts = qc.getQueryData<TFeedPost[]>(["feed-posts"]);
      qc.setQueryData(["feed-posts"], (old: TFeedPost[] | undefined) => {
        if (!old) return [];
        return old.filter((post) => post.id !== variables);
      });
      return { previousPosts };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.previousPosts) {
        qc.setQueryData(["feed-posts"], context.previousPosts);
      }
      toast.error("Failed to delete. Please try again.");
    },
  });
};
