import type { TCreateCommentApiSchema } from "./schema";
import { privateAxios } from "#/lib/axios";

export const createCommentApi = async (body: TCreateCommentApiSchema) => {
  const { data } = await privateAxios.post("/comments", body);
  return data.data as TCreateCommentResponse;
};

export type TCreateCommentResponse = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    image: string | null;
    username: string;
  };
  content: string;
  postId: string;
  parentId: string | null;
};
