import { Prisma } from "@/generated/prisma/client";
import z from "zod";

export const MAX_CAPTION_LENGTH = 200;

type UserMinimal = {
  id: string;
  username: string;
  name: string;
  image?: string | null;
};

export type MediaWithTaggedUsers = {
  order: number;
  src: string;
  file: File;
  taggedUsers: Array<TaggedUser>;
  type: MediaType;
};

export type TaggedUser = {
  id: string;
  username: string;
  coordinate: {
    x: number;
    y: number;
  };
};

export type MediaType = "image" | "video";

export const createPostFormSchema = z.object({
  caption: z
    .string()
    .max(
      MAX_CAPTION_LENGTH,
      `Caption must be less than ${MAX_CAPTION_LENGTH} characters`,
    ),
  location: z.string().optional(),
  collaborators: z.array(z.custom<UserMinimal>()).optional(),
});

export const createPostSchema = createPostFormSchema.extend({
  media: z.custom<Omit<MediaWithTaggedUsers, "file">[]>(),
  aspectRatio: z.custom<Prisma.ConcretePostCreateInput["aspectRatio"]>(),
});

export type TCreatePostFormSchema = z.infer<typeof createPostFormSchema>;
export type TCreatePostSchema = z.infer<typeof createPostSchema>;
