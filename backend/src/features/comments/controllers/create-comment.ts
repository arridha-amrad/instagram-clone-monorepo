import { MyApiError } from "#/errors.js";
import { PrismaClient } from "#/generated/prisma/client.js";

export default async function createComment(
  prisma: PrismaClient,
  postId: string,
  userId: string,
  comment: string,
  commentParentId?: string,
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
    const newComment = await prisma.postComment.create({
      data: {
        postId,
        content: comment,
        userId,
        parentId: commentParentId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        postId: true,
        parentId: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });
    return newComment;
  } catch (err) {
    throw err;
  }
}
