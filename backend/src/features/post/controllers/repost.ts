import { PrismaClient } from "#/generated/prisma/client.js";

export const repost = async (
  prisma: PrismaClient,
  postId: string,
  userId: string,
) => {
  try {
    const isRepost = await prisma.repost.findUnique({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
    if (isRepost) {
      await prisma.repost.delete({
        where: {
          userId_postId: {
            postId,
            userId,
          },
        },
      });
    } else {
      await prisma.repost.create({
        data: {
          postId,
          userId,
        },
      });
    }
    return {
      isRepost: !isRepost,
    };
  } catch (err) {
    throw err;
  }
};
