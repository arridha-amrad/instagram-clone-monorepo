import { publicAxios } from "#/lib/axios";

export const fetchProfileTaggedPostsApi = async (userId: string) => {
  const { data } = await publicAxios.get(`/posts/tagged/profile/${userId}`);
  return data.data as TProfileTaggedPost[];
};

export type TProfileTaggedPost = {
  media: {
    id: string;
    createdAt: Date;
    order: number;
    url: string;
    postId: string;
  };
  userId: string;
};
