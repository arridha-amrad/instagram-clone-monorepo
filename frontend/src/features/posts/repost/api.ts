import { privateAxios } from "#/lib/axios";

export const repostApi = async (postId: string) => {
  const { data } = await privateAxios.post(`/posts/repost`, { postId });
  return data.data as { isRepost: boolean };
};
