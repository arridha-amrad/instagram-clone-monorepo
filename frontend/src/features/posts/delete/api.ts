import { privateAxios } from "#/lib/axios";

export const deletePostApi = async (postId: string) => {
  return privateAxios.delete(`/posts/${postId}`);
};
