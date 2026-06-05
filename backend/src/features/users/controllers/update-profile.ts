import { PrismaClient } from "#/generated/prisma/client.js";
import { TUserProfileSchema } from "../zod-schema.js";

export default async function updateProfile(
  prisma: PrismaClient,
  userId: string,
  data: TUserProfileSchema,
) {
  try {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
      },
    });
    return await prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: data.bio,
        gender: data.gender,
        location: data.location,
        occupation: data.occupation,
        web: data.web,
      },
      update: {
        bio: data.bio,
        gender: data.gender,
        location: data.location,
        occupation: data.occupation,
        web: data.web,
      },
    });
  } catch (err) {
    throw err;
  }
}
