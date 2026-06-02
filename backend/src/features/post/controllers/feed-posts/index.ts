import { PrismaClient } from "@/generated/prisma/client";

export const fetchFeedPosts = async (prisma: PrismaClient, userId?: string) => {
  const posts = await prisma.concretePost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reposts: {
        where: {
          userId,
        },
        select: {
          userId: true,
        },
      },
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
      _count: {
        select: {
          comments: true,
          postLikes: true,
          reposts: true,
          bookmarks: true,
        },
      },
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
      media: {
        select: {
          id: true,
          order: true,
          mediaType: true,
          url: true,
          taggedUsers: {
            select: {
              id: true,
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
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return posts.map((p) => {
    const { postLikes, reposts, bookmarks, ...rest } = p;
    return {
      ...rest,
      isLiked: postLikes ? postLikes.length > 0 : false,
      isRepost: reposts ? reposts.length > 0 : false,
      isBookmarked: bookmarks ? bookmarks.length > 0 : false,
    };
  });
};
