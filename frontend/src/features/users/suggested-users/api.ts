import { privateAxios } from "#/lib/axios";

export const fetchSuggestedUsersApi = async () => {
  const { data } = await privateAxios.get(`/users/suggested-users`);
  return data.data as TSuggestedUsers[];
};

export type TSuggestedUsers = {
  id: string;
  name: string;
  username: string;
  image: string | null;
};
