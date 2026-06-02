import { env } from "@/config/env";
import { v2 as cloudinary } from "cloudinary";

export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_SECRET,
  });
};

export const createSignature = async ({ folder }: { folder?: string }) => {
  initCloudinary();
  var timestamp = Math.round(Date.now() / 1000);
  // Buat signature (misalnya untuk folder 'video-uploads')
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder,
    },
    env.CLOUDINARY_SECRET as string,
  );

  return {
    signature,
    timestamp,
    cloudName: env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: env.CLOUDINARY_API_KEY as string,
  };
};

export const getPublicIdFromUrl = (url: string) => {
  const parts = url.split("/");
  const startIndex = parts.indexOf("instagram-monorepo-hono-api");
  if (startIndex === -1) return null;
  const publicIdWithExtension = parts.slice(startIndex).join("/");
  return publicIdWithExtension.replace(/\.[^/.]+$/, "");
};

export const removeFile = async (url: string) => {
  initCloudinary();
  const public_id = getPublicIdFromUrl(url);
  if (!public_id) return null;
  await cloudinary.uploader.destroy(public_id);
  return "deleted";
};
