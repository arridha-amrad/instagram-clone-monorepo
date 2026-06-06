import { PrismaClient } from "#/generated/prisma/client.js";
import { uploadToCloudinary } from "#/lib/cloudinaryFn.js";

export default async function updateBackgroundWallpaper(
  prisma: PrismaClient,
  userId: string,
  file: File,
) {
  try {
    const { secure_url } = await uploadToCloudinary(
      file,
      "instagram-monorepo-hono-api/bgWallpaper",
    );
    return prisma.userProfile.update({
      where: {
        userId,
      },
      data: {
        bgWallpaper: secure_url,
      },
    });
  } catch (err) {
    throw err;
  }
}
