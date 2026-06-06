import { privateAxios } from "#/lib/axios";

export const updateAvatarApi = async (formData: FormData) => {
  const { data } = await privateAxios.put("/users/profile/avatar", formData);
  return data.data as string;
};
