import { AspectRatio, PrismaClient } from "#/generated/prisma/client.js";
import { TCreatePostSchema } from "./schema.js";

export const mapStringToAspectRatio = (input: string): AspectRatio => {
  const cleanInput = input.replace(/\s+/g, "");
  const mapper: Record<string, AspectRatio> = {
    "1/1": AspectRatio.RATIO_1_1,
    "4/5": AspectRatio.RATIO_4_5,
    "9/16": AspectRatio.RATIO_9_16,
    "6/19": AspectRatio.RATIO_9_16,
  };
  return mapper[cleanInput] || AspectRatio.RATIO_1_1;
};

export default async function createPost(
  prisma: PrismaClient,
  data: TCreatePostSchema,
  userId: string,
) {
  console.log(JSON.stringify(data, null, 2));

  const { aspectRatio, caption, collaborators, location, media } = data;
  try {
    const newPost = await prisma.concretePost.create({
      data: {
        userId,
        caption,
        location,
        aspectRatio: mapStringToAspectRatio(aspectRatio),
        collaborators:
          collaborators && collaborators.length > 0
            ? {
                createMany: {
                  data: collaborators.map((c) => ({
                    userId: c.id,
                  })),
                },
              }
            : undefined,
        media:
          media && media.length > 0
            ? {
                create: media.map((m) => ({
                  mediaType: m.type.toUpperCase() as "IMAGE" | "VIDEO",
                  url: m.src,
                  order: m.order,
                  taggedUsers:
                    m.taggedUsers && m.taggedUsers.length > 0
                      ? {
                          createMany: {
                            data: m.taggedUsers.map((t) => ({
                              userId: t.id,
                              coordinateX: t.coordinate.x,
                              coordinateY: t.coordinate.y,
                            })),
                          },
                        }
                      : undefined,
                })),
              }
            : undefined,
      },
    });
    return findJustCreatedPost(prisma, newPost.id);
  } catch (err) {
    throw err;
  }
}

export const findJustCreatedPost = async (
  prisma: PrismaClient,
  postId: string,
) => {
  return await prisma.concretePost.findFirst({
    where: {
      id: postId,
    },
    include: {
      collaborators: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
      user: {
        select: {
          username: true,
          id: true,
          image: true,
        },
      },
      media: {
        select: {
          id: true,
          url: true,
          mediaType: true,
          taggedUsers: {
            include: {
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
      _count: {
        select: {
          comments: true,
          postLikes: true,
        },
      },
    },
  });
};
