import { privateAxios } from "#/lib/axios";

export const deleteCommentApi = async (commentId: string) => {
  return privateAxios.delete(`/comments/${commentId}`);
};
