import { env } from "#/config/env.js";
import { MyApiError } from "#/errors.js";
import { PrismaClient } from "#/generated/prisma/client.js";
import { removeFile, uploadToCloudinary } from "#/lib/cloudinaryFn.js";

export default async function updateAvatar(
  prisma: PrismaClient,
  userId: string,
  file: File,
) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new MyApiError("user not found", 404);
    if (user.image) {
      await removeFile(user.image);
    }
    const { secure_url } = await uploadToCloudinary(
      file,
      `${env.CLOUDINARY_FOLDER}/avatar`,
    );
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        image: secure_url,
      },
    });
    return secure_url;
  } catch (err) {
    throw err;
  }
}
