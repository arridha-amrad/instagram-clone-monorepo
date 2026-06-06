import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUserApi } from "./api";
import type { TSuggestedUsers } from "../suggested-users/api";
import toast from "react-hot-toast";

export const useFollowUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (targetId: string) => {
      try {
        return followUserApi(targetId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async (targetId) => {
      await qc.cancelQueries({ queryKey: ["suggested-users"] });
      const oldSuggUsers = qc.getQueryData<TSuggestedUsers[]>([
        "suggested-users",
      ]);
      qc.setQueryData(
        ["suggested-users"],
        (old: TSuggestedUsers[] | undefined) => {
          if (!old) return [];
          return old.map((su) => {
            if (su.id !== targetId) return su;
            return {
              ...su,
              isFollow: su.id === targetId ? !su.isFollow : su.isFollow,
            };
          });
        },
      );
      return { oldSuggUsers };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.oldSuggUsers) {
        qc.setQueryData(["suggested-users"], context.oldSuggUsers);
      }
      toast.error(err.message);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
