import { privateAxios } from "#/lib/axios";

export const bookmarksPostApi = async (postId: string) => {
  const { data } = await privateAxios.post(`posts/bookmark`, {
    postId,
  });
  return data.data;
};
