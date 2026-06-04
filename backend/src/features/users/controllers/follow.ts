import { PrismaClient } from "#/generated/prisma/client.js";

export default async function follow(
  prisma: PrismaClient,
  userId: string,
  targetId: string,
) {
  try {
    const isFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetId,
        },
      },
    });

    if (!isFollow) {
      await prisma.follow.create({
        data: {
          followerId: userId,
          followingId: targetId,
        },
      });
    } else {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetId,
          },
        },
      });
    }
    return {
      isFollow: !isFollow,
    };
  } catch (err) {
    throw err;
  }
}
