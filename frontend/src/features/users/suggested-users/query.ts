import { queryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchSuggestedUsersApi } from "./api";

export const suggestedUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["suggested-users"],
    queryFn: async () => {
      try {
        return fetchSuggestedUsersApi();
      } catch (err) {
        console.log(err);
        toast.error("failed to fetch suggested users");
      }
    },
    staleTime: 1000 * 60 * 5,
  });
