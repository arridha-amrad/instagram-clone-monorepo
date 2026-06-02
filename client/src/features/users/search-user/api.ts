import { env } from "#/config/env";
import { privateAxios } from "#/lib/axios";
import axios from "axios";

export const searchUsersApi = async (searchKey: string) => {
  const { data } = await axios.get(
    `${env.VITE_SERVER_BASE_URL}/api/users/search`,
    {
      params: {
        q: searchKey,
      },
    },
  );
  return data.data as TSearchUser[];
};

export const addToSearchHistoryApi = async (targetId: string) => {
  const { data } = await privateAxios.post("/users/search/histories", {
    targetId,
  });
  return data;
};

export const fetchSearchHistories = async () => {
  const { data } = await privateAxios.get(`/users/search/histories`);
  return data.data as TSearchUser[];
};

export const deleteSearchHistoryApi = async (targetId: string) => {
  const { data } = await privateAxios.delete(
    `/users/search/histories/one/${targetId}`,
  );
  return data.data;
};

export const deleteAllSearchHistoriesApi = async () => {
  const { data } = await privateAxios.delete("/users/search/histories");
  return data.data;
};

export type TSearchUser = {
  id: string;
  username: string;
  image: string;
  name: string;
};
