import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAvatarApi } from "./api";
import { authQueryOptions } from "#/features/auth/query";
import type { TFetchProfile } from "../fetch-profile/api";
import type { TSession } from "#/features/auth/api";

export const useUpdateAvatarMutation = () => {
  const qc = useQueryClient();
  const { data: authUser } = useQuery(authQueryOptions());
  return useMutation({
    mutationFn: (formData: FormData) => updateAvatarApi(formData),
    onSuccess: (newImageUrl) => {
      qc.setQueryData(
        ["profile", authUser?.user.username],
        (profile: TFetchProfile | undefined) => {
          if (!profile) return;
          return {
            ...profile,
            image: newImageUrl,
          };
        },
      );
      qc.setQueryData(["auth"], (data: TSession | undefined) => {
        if (!data) return;
        return {
          ...data,
          user: {
            ...data.user,
            image: newImageUrl,
          },
        };
      });
    },
  });
};
