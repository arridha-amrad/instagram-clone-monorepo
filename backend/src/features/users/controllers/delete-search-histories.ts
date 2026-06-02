import { PrismaClient } from "@/generated/prisma/client";

export const deleteSearchHistory = async (prisma: PrismaClient, id: string) => {
  try {
    return prisma.searchHistory.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const deleteAllSearchHistories = async (
  prisma: PrismaClient,
  userId: string,
) => {
  try {
    await prisma.searchHistory.deleteMany({
      where: {
        userId,
      },
    });
    return "deleted";
  } catch (err) {
    throw err;
  }
};
