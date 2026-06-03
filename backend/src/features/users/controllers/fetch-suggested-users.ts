import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchSuggestedUsers(prisma: PrismaClient, userId: string) {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
      take: 5,
      where: {
        id: {
          not: userId
        }
      }
    });
    return users;
  } catch (err) {
    throw err;
  }
}
