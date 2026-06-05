import { createServerFn } from "@tanstack/react-start";
import type { Gender, TUserProfileSchema } from "./zod-schema";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { privateAxios } from "#/lib/axios";

export const updateProfileApi = createServerFn({ method: "POST" })
  .inputValidator((data: TUserProfileSchema) => data)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const headersObj = Object.fromEntries(headers.entries());
    const { data: response } = await privateAxios.post("/users/profile", data, {
      headers: {
        ...headersObj,
      },
    });
    return response.data;
  });

export type TUpdateProfileResult = {
  id: string;
  userId: string;
  occupation: string | null;
  gender: Gender | null;
  bio: string | null;
  web: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
};
