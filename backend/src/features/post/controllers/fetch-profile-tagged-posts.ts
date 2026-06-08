import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchProfileTaggedPosts(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const posts = await prisma.postTaggedUser.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        media: true,
        userId: true,
      },
    });
    return posts;
  } catch (err) {
    throw err;
  }
}
