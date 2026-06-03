import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToSearchHistoryApi,
  deleteAllSearchHistoriesApi,
  deleteSearchHistoryApi,
  type TSearchUser,
} from "./api";
import toast from "react-hot-toast";

export const useAddToSearchHistoryMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (targetId: string) => {
      try {
        return addToSearchHistoryApi(targetId);
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["search-histories"],
        refetchType: "none",
      });
    },
  });
};

export const useDeleteFromSearchHistoryMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (targetId: string) => {
      try {
        return deleteSearchHistoryApi(targetId);
      } catch (err) {
        throw err;
      }
    },
    onMutate: async (targetId) => {
      await qc.cancelQueries({ queryKey: ["search-histories"] });
      const prevData = qc.getQueryData<TSearchUser[]>(["search-histories"]);
      qc.setQueryData(
        ["search-histories"],
        (old: TSearchUser[] | undefined) => {
          if (!old) return [];
          return old.filter((user) => user.id !== targetId);
        },
      );
      return { prevData };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.prevData) {
        qc.setQueryData(["feed-posts"], context.prevData);
      }
      toast.error("Failed to delete. Please try again.");
    },
  });
};

export const useDeleteAllFromSearchHistoriesMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        return deleteAllSearchHistoriesApi();
      } catch (err) {
        throw err;
      }
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["search-histories"] });
      const prevData = qc.getQueryData<TSearchUser[]>(["search-histories"]);
      qc.setQueryData(["search-histories"], () => {
        return [];
      });
      return { prevData };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context?.prevData) {
        qc.setQueryData(["search-histories"], context.prevData);
      }
      toast.error("failed to delete search histories");
    },
  });
};
