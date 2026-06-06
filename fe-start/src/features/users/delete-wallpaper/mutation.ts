import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWallpaperApi } from "./api";
import { authQueryOptions } from "#/features/auth/query";
import type { TFetchProfile } from "../fetch-profile/api";

export const useDeleteWallpaperMutation = () => {
  const qc = useQueryClient();
  const { data: authUser } = useQuery(authQueryOptions());
  return useMutation({
    mutationFn: deleteWallpaperApi,
    onSuccess: () => {
      qc.setQueryData(
        ["profile", authUser?.user.username],
        (profile: TFetchProfile | undefined) => {
          if (!profile) return;
          return {
            ...profile,
            userProfile: {
              ...profile.userProfile,
              bgWallpaper: null,
            },
          };
        },
      );
    },
  });
};
