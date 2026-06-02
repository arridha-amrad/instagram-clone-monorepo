import { PrismaClient } from "@/generated/prisma/client";

export default async function addToSearchHistory(
  prisma: PrismaClient,
  userId: string,
  targetId: string,
) {
  try {
    const isSaved = await prisma.searchHistory.findUnique({
      where: {
        userId_targetId: {
          targetId,
          userId,
        },
      },
    });
    if (!isSaved) {
      await prisma.searchHistory.create({
        data: {
          userId,
          targetId,
        },
      });
    }
    return "saved";
  } catch (err) {
    throw err;
  }
}
