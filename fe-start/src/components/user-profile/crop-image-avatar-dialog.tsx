import { createClientOnlyFn } from "@tanstack/react-start";
import React, { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  imageSrc: string | null;
  onCrop: (file: File) => void;
  children: React.ReactNode;
};

const CropImageAvatarDialog = ({ imageSrc, onCrop, children }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsCropping(true);
    try {
      const croppedBlob = await getCroppedImg({
        imageSrc,
        pixelCrop: croppedAreaPixels,
      });

      if (croppedBlob) {
        const file = convertBlobToFile(croppedBlob, "avatar.jpg");
        onCrop(file);
      }
    } catch (error) {
      console.error("Crop error:", error);
      toast.error("Failed to crop image");
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden flex flex-col h-[500px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Drag and zoom to crop your profile picture.
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 p-0 bg-muted rounded-md overflow-hidden my-4">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isCropping}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCrop} disabled={isCropping || !imageSrc}>
            {isCropping ? <Loader2 className="animate-spin" /> : "Apply Crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropImageAvatarDialog;

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
