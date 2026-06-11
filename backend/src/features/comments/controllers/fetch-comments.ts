import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchComments(
  prisma: PrismaClient,
  postId: string,
  userId?: string,
) {
  try {
    const comments = await prisma.postComment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        parentId: true,
        postId: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            childComments: true,
            commentLikes: true,
          },
        },
        commentLikes: userId
          ? {
              where: {
                userId,
              },
              select: {
                userId: true,
              },
            }
          : false,
      },
    });
    return comments.map((c) => {
      const { commentLikes, ...rest } = c;
      return {
        ...rest,
        isLiked: commentLikes ? commentLikes.length > 0 : false,
      };
    });
  } catch (err) {
    throw err;
  }
}
