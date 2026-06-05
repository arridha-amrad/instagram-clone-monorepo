import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editProfileApi } from "./api";
import type { TEditProfileSchema } from "./zod-schema";
import { authQueryOptions } from "#/features/auth/query";
import toast from "react-hot-toast";

export const useEditProfileMutation = () => {
  const { data: authUser } = useQuery(authQueryOptions());
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TEditProfileSchema) => {
      try {
        return editProfileApi(body);
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", authUser?.user.username] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
};
