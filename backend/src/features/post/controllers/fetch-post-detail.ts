import { MyApiError } from "#/errors.js";
import { PrismaClient } from "#/generated/prisma/client.js";

export default async function fetchPostDetail(
  prisma: PrismaClient,
  postId: string,
  userId?: string,
) {
  try {
    const post = await prisma.concretePost.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        collaborators: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
        },
        reposts: userId
          ? {
              where: {
                userId,
              },
              select: {
                userId: true,
              },
            }
          : false,
        bookmarks: userId
          ? {
              where: {
                userId,
              },
              select: {
                userId: true,
              },
            }
          : false,
        postLikes: userId
          ? {
              where: {
                userId,
              },
              select: {
                userId: true,
              },
            }
          : false,
        aspectRatio: true,
        _count: {
          select: {
            postLikes: true,
          },
        },
        caption: true,
        createdAt: true,
        updatedAt: true,
        location: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        media: {
          select: {
            id: true,
            url: true,
            mediaType: true,
            order: true,
            taggedUsers: {
              select: {
                coordinateX: true,
                coordinateY: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!post) throw new MyApiError("post not found", 404);
    const { postLikes, reposts, bookmarks, ...rest } = post;
    return {
      ...rest,
      isLiked: postLikes ? postLikes.length > 0 : false,
      isRepost: reposts ? reposts.length > 0 : false,
      isBookmarked: bookmarks ? bookmarks.length > 0 : false,
    };
  } catch (err) {
    throw err;
  }
}
