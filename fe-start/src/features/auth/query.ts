import { queryOptions } from "@tanstack/react-query";
import { getCurrSession, type TSession } from "./api";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["auth"],
    queryFn: getCurrSession,
    select(data: any) {
      if (data.data) {
        return data.data as TSession;
      }
      return data as TSession;
    },
    staleTime: 5 * 60 * 1000,
  });
