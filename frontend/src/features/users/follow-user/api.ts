import { privateAxios } from "#/lib/axios";

export const followUserApi = async (targetId: string) => {
  const { data } = await privateAxios.post("/users/follow", {
    targetId,
  });
  return data.data as { isFollow: boolean };
};
