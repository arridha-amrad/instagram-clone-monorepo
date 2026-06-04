import { privateAxios } from "#/lib/axios";
import type {
  MediaType
} from "../create/components/create-post-context";

export const fetchFeedPosts = async () => {
  const { data } = await privateAxios.get(`/posts/feed`);
  const posts = data.data as any[];
  return posts.map((p) => ({ ...p, comments: [] })) as TFeedPost[];
};

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
  comments: {
    id: string;
    postId: string;
    username: string;
    comment: string;
    userId: string;
  }[];
};
