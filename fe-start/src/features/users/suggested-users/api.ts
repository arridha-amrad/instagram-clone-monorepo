import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchSuggestedUsersApi = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const headersPlainObject = Object.fromEntries(headers.entries());
    const { data } = await privateAxios.get(`/users/suggested-users`, {
      headers: {
        ...headersPlainObject,
      },
    });
    return data.data as TSuggestedUsers[];
  },
);

export type TSuggestedUsers = {
  id: string;
  name: string;
  username: string;
  image: string | null;
} & { isFollow?: boolean };
