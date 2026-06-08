import { publicAxios } from "#/lib/axios";
import type { TProfilePost } from "../user-posts/api";

export const fetchProfileBookmarkedPosts = async (userId: string) => {
  const { data } = await publicAxios(`/posts/saved/profile/${userId}`);
  return data.data as TProfilePost[];
};
