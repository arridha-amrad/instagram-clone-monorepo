import { privateAxios } from "#/lib/axios";
import type { Gender } from "../edit-profile/zod-schema";

export const updateBackgroundWallpaperApi = async (formData: FormData) => {
  const { data } = await privateAxios.put("/users/profile/wallpaper", formData);
  return data.data as TUpdateBgWallpaper;
};

export type TUpdateBgWallpaper = {
  id: string;
  userId: string;
  occupation: string | null;
  gender: Gender | null;
  bio: string | null;
  web: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
  bgWallpaper: string | null;
};
