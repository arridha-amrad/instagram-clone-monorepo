import { PrismaClient } from "@/generated/prisma/client";

export const likePost = async (
  prisma: PrismaClient,
  userId: string,
  postId: string,
) => {
  try {
    const isLiked = await prisma.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (isLiked) {
      await prisma.postLike.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          userId,
          postId,
        },
      });
    }
    return {
      liked: !isLiked,
    };
  } catch (err) {
    throw err;
  }
};
