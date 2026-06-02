import { PrismaClient } from "@/generated/prisma/client";
import { removeFile } from "@/lib/cloudinaryFn";

export const deletePost = async (
  prisma: PrismaClient,
  userId: string,
  postId: string,
) => {
  try {
    const post = await prisma.concretePost.findUnique({
      where: {
        id: postId,
      },
      include: {
        media: true,
      },
    });
    if (!post) {
      throw new Error("Post not found");
    }

    // cek apakah user adalah pemilik post
    if (post.userId !== userId) {
      throw new Error("You are not authorized to delete this post");
    }

    // hapus files dari storage
    await Promise.all(
      post.media.map(async (m) => {
        await removeFile(m.url);
      }),
    );

    // hapus semua relasi
    await prisma.concretePost.delete({
      where: {
        id: postId,
      },
    });
    return "deleted";
  } catch (err) {
    throw err;
  }
};
