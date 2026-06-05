import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import type { MediaType } from "../create/components/create-post-context";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchFeedPostsApi = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const headersPlainObject = Object.fromEntries(headers.entries());
    const { data } = await privateAxios("/posts/feed", {
      withCredentials: true,
      headers: {
        ...headersPlainObject,
      },
    });
    return data.data as TFeedPost[];
  },
);

type TAspectRatio = "RATIO_4_5" | "RATIO_1_1";

export type TFeedPost = {
  isLiked: boolean;
  isRepost: boolean;
  isBookmarked: boolean;
  user: {
    id: string;
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
      id: string;
      user: {
        id: string;
        username: string;
      };
      coordinateX: number;
      coordinateY: number;
    }[];
  }[];
  _count: {
    comments: number;
    postLikes: number;
    reposts: number;
    bookmarks: number;
  };
} & {
  id: string;
  caption: string;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
  aspectRatio: TAspectRatio;
  userId: string;
} & {
  comments?: {
    id: string;
    postId: string;
    username: string;
    comment: string;
    userId: string;
  }[];
};
