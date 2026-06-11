import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchCommentsApi = createServerFn({ method: "GET" })
  .inputValidator((postId: string) => postId)
  .handler(async ({ data: postId }) => {
    const headers = getRequestHeaders();
    const headersPlainObject = Object.fromEntries(headers.entries());
    const { data } = await privateAxios.get(`/comments/${postId}`, {
      headers: {
        ...headersPlainObject,
      },
    });
    return data.data as TComment[];
  });

export type Comment = {
  id: string;
  isLiked: boolean;
  content: string;
  postId: string;
  parentId: string | null;
  createdAt: Date;
  user: {
    id: string;
    image: string | null;
    username: string;
  };
  _count: {
    childComments: number;
    commentLikes: number;
  };
};

export type TComment = Comment & {
  childComments?: Comment[];
};
