import { privateAxios } from "#/lib/axios";

export const deleteWallpaperApi = async () => {
  return privateAxios.delete("/users/profile/wallpaper");
};
