import { clsx, type ClassValue } from "clsx";
import type { Area } from "react-easy-crop";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJoinedDate(createdAt: string | Date | number): string {
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) {
    return "Joined recently";
  }
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date,
  );
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
}

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
): Promise<File> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2d context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas empty"));
        return;
      }
      const file = new File([blob], "avatar.jpeg", { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
};
