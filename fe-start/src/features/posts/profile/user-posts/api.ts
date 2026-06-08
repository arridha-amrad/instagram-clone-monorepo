import { publicAxios } from "#/lib/axios";

export const fetchProfilePostsApi = async (userId: string) => {
  const { data } = await publicAxios.get(`/posts/profile/${userId}`);
  return data.data as TProfilePost[];
};

export type TProfilePost = {
  id: string;
  media: {
    url: string;
  }[];
  _count: {
    media: number;
    comments: number;
    postLikes: number;
  };
};
