import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchProfileBookmarkedPosts(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const posts = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        _count: {
          select: {
            postLikes: true,
            comments: true,
            media: true,
          },
        },
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    return posts;
  } catch (err) {
    throw err;
  }
}
