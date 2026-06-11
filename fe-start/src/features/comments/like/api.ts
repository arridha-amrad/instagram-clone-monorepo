import { privateAxios } from "#/lib/axios";

export const likeCommentApi = async (commentId: string) => {
  const { data } = await privateAxios.post("/comments/like", {
    commentId,
  });
  return data.data as { liked: boolean };
};
