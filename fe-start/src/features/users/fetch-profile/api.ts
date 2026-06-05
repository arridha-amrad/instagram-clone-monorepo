import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { Gender } from "../update-profile/zod-schema";

export const fetchProfileApi = createServerFn({ method: "GET" })
  .inputValidator((username: string) => username)
  .handler(async ({ data: username }) => {
    const headers = getRequestHeaders();
    const headersObj = Object.fromEntries(headers.entries());
    const { data } = await privateAxios.get(`/users/profile/${username}`, {
      headers: {
        ...headersObj,
      },
    });
    return data.data as TFetchProfile;
  });

export type TFetchProfile = {
  id: string;
  userProfile: {
    occupation: string | null;
    gender: Gender | null;
    bio: string | null;
    web: string | null;
    location: string | null;
  } | null;
  username: string;
  image: string | null;
  name: string;
  followers: {
    followerId: string;
  }[];
  createdAt: Date;
  _count: {
    concretePosts: number;
    followers: number;
    following: number;
  };
} | null;
