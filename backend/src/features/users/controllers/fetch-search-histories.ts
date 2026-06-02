import { PrismaClient } from "@/generated/prisma/client";

export default async function fetchSearchHistories(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const users = await prisma.searchHistory.findMany({
      where: {
        userId,
      },
      include: {
        targetUser: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return users.map((user) => ({
      id: user.targetUser.id,
      username: user.targetUser.username,
      name: user.targetUser.name,
      image: user.targetUser.image,
    }));
  } catch (err) {
    throw err;
  }
}
