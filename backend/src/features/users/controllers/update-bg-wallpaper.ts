import { env } from "#/config/env.js";
import { PrismaClient } from "#/generated/prisma/client.js";
import { removeFile, uploadToCloudinary } from "#/lib/cloudinaryFn.js";

export async function removeCurrentBackgroundWallpaper(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });
    if (userProfile && userProfile.bgWallpaper) {
      await removeFile(userProfile.bgWallpaper);
      await prisma.userProfile.update({
        where: {
          userId,
        },
        data: {
          bgWallpaper: null,
        },
      });
    }
  } catch (err) {
    throw err;
  }
}

export async function updateBackgroundWallpaper(
  prisma: PrismaClient,
  userId: string,
  file: File,
) {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });
    if (userProfile && userProfile.bgWallpaper) {
      await removeFile(userProfile.bgWallpaper);
    }
    const { secure_url } = await uploadToCloudinary(
      file,
      `${env.CLOUDINARY_FOLDER}/bgWallpaper`,
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
