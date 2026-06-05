import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchProfile(
  prisma: PrismaClient,
  username: string,
  userId: string,
) {
  try {
    return await prisma.users.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        userProfile: {
          select: {
            bio: true,
            gender: true,
            location: true,
            occupation: true,
            web: true,
          },
        },
        createdAt: true,
        followers: {
          where: {
            followerId: userId,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            concretePosts: true,
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
}
