import { MyApiError } from "#/errors.js";
import { PrismaClient } from "#/generated/prisma/client.js";

export default async function likeComment(
  prisma: PrismaClient,
  commentId: string,
  userId: string,
) {
  try {
    const comment = await prisma.postComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new MyApiError("comment not found", 404);

    const isLiked = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (isLiked) {
      await prisma.commentLike.delete({
        where: {
          userId_commentId: {
            commentId,
            userId,
          },
        },
      });
    } else {
      await prisma.commentLike.create({
        data: {
          userId,
          commentId,
        },
      });
    }

    return {
      liked: !isLiked,
    };
  } catch (err) {
    throw err;
  }
}
