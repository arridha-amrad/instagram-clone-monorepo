import { MyApiError } from "@/errors";
import { PrismaClient } from "@/generated/prisma/client";

export const deleteComment = async (
  prisma: PrismaClient,
  commentId: string,
  userId: string,
) => {
  try {
    const comment = await prisma.postComment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new MyApiError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new MyApiError("Unauthorized", 403);
    }

    await prisma.postComment.delete({
      where: {
        id: commentId,
      },
    });
    return true;
  } catch (err) {
    throw err;
  }
};
