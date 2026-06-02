import { MyApiError } from "@/errors";
import { PrismaClient } from "@/generated/prisma/client";

export async function bookmarkPost(
  prisma: PrismaClient,
  postId: string,
  userId: string,
) {
  try {
    const post = await prisma.concretePost.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new MyApiError("Post not found", 404);
    }
    const isSaved = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (isSaved) {
      await prisma.bookmark.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      await prisma.bookmark.create({
        data: {
          userId,
          postId,
        },
      });
    }
    return {
      saved: !isSaved,
    };
  } catch (err) {
    throw err;
  }
}
