import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TCreatePostSchema } from "./schema";
import toast from "react-hot-toast";
import { createPost } from "./api";

export const useCreatePostMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: TCreatePostSchema) => {
      try {
        return createPost(data);
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed-posts"] });
      toast.success("Post created successfully");
    },
  });
};
