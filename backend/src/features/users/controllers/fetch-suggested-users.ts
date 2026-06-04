import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchSuggestedUsers(prisma: PrismaClient, userId: string) {
  try {
    const followings = await prisma.follow.findMany({
      where: {
        followerId: userId
      },
      select: {
        followingId: true
      }
    })

    const fids = followings.map((f) => f.followingId)

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
          not: {
            in: [userId, ...fids]
          }
        },
      }
    });
    return users;
  } catch (err) {
    throw err;
  }
}
