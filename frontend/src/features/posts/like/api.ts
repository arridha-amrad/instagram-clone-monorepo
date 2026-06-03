import { privateAxios } from "#/lib/axios";

export const likePost = async (postId: string) => {
  return privateAxios.post(`/posts/like`, {
    postId,
  });
};
