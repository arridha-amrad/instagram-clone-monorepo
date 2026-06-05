import { privateAxios } from "#/lib/axios";
import type { TEditProfileSchema } from "./zod-schema";

export const editProfileApi = async (body: TEditProfileSchema) => {
  const { data } = await privateAxios.post("/users/profile", body);
  return data.data;
};
