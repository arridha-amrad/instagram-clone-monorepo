import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateBackgroundWallpaperApi } from "./api";
import { authQueryOptions } from "#/features/auth/query";
import type { TFetchProfile } from "../fetch-profile/api";

export const useUpdateBgWallpaperMutation = () => {
  const qc = useQueryClient();
  const { data: authUser } = useQuery(authQueryOptions());
  return useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        return updateBackgroundWallpaperApi(formData);
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(
        ["profile", authUser?.user.username],
        (profile: TFetchProfile | undefined) => {
          if (!profile) return;
          return {
            ...profile,
            userProfile: {
              ...profile.userProfile,
              bgWallpaper: data.bgWallpaper,
            },
          };
        },
      );
    },
  });
};
