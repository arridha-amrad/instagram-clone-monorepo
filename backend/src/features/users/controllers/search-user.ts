import { PrismaClient } from "@/generated/prisma/client";

export default async function searchUser(prisma: PrismaClient, query: string) {
  try {
    const users = await prisma.users.findMany({
      where: {
        username: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
        name: true,
      },
      take: 5,
    });
    return users;
  } catch (err) {
    throw err;
  }
}
