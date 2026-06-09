import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchPostDetailApi = createServerFn({ method: "GET" })
  .inputValidator((postId: string) => postId)
  .handler(async ({ data: postId }) => {
    const headers = getRequestHeaders();
    const headersPlainObject = Object.fromEntries(headers.entries());
    const { data } = await privateAxios.get(`/posts/detail/${postId}`, {
      headers: {
        ...headersPlainObject,
      },
    });
    return data.data as TDetailPost;
  });

export type MediaType = "image" | "video";
type TAspectRatio = "RATIO_4_5" | "RATIO_1_1";
export type TDetailPost = {
  id: string;
  isLiked: boolean;
  isRepost: boolean;
  isBookmarked: boolean;
  caption: string;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
  aspectRatio: TAspectRatio;
  user: {
    id: string;
    name: string;
    image: string | null;
    username: string;
  };
  collaborators: {
    user: {
      id: string;
      image: string | null;
      username: string;
    };
  }[];
  media: {
    id: string;
    url: string;
    mediaType: MediaType;
    order: number;
    taggedUsers: {
      user: {
        id: string;
        username: string;
      };
      coordinateX: number;
      coordinateY: number;
    }[];
  }[];
  _count: {
    postLikes: number;
  };
};
