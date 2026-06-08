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
        post: {
          select: {
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
        },
      },
    });
    return posts.map((p) => ({
      id: p.id,
      media: p.post.media,
      _count: p.post._count,
    }));
  } catch (err) {
    throw err;
  }
}
