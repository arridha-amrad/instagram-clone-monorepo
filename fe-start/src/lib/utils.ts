import { createClientOnlyFn } from "@tanstack/react-start";
import { clsx, type ClassValue } from "clsx";
import type { Area } from "react-easy-crop";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCroppedImg = createClientOnlyFn(
  async ({
    imageSrc,
    pixelCrop,
  }: {
    imageSrc: string;
    pixelCrop: Area;
  }): Promise<Blob | null> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  },
);

export const convertBlobToFile = createClientOnlyFn(
  (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });
  },
);

export const formatJoinedDate = createClientOnlyFn(
  (date: Date | string | number | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    });
    return `Joined ${formatter.format(d)}`;
  },
);
