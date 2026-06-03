import { useQuery } from "@tanstack/react-query";
import { fetchSearchHistories } from "./api";

export const useFetchHistoriesQuery = () => {
  return useQuery({
    queryKey: ["search-histories"],
    queryFn: async () => {
      try {
        return fetchSearchHistories();
      } catch (err) {
        throw err;
      }
    },
    staleTime: Infinity,
  });
};
