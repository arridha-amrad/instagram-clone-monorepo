import { Button } from "#/components/ui/button";
import { useUpdateBgWallpaperMutation } from "#/features/users/update-wallpaper/mutation";
import { getCroppedImg } from "#/lib/utils";
// import { getCroppedImg } from "#/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import toast from "react-hot-toast";

const UpdatableWallpaper = ({
  children,
  inputFileRef,
  wallpaperContainerHeight,
  wallpaperContainerWidth,
  setCurrentBackground,
}: {
  children: React.ReactNode;
  inputFileRef: React.RefObject<HTMLInputElement | null>;
  wallpaperContainerWidth: number;
  wallpaperContainerHeight: number;
  setCurrentBackground: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [pickedImageFile, setPickedImageFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { mutateAsync, isPending } = useUpdateBgWallpaperMutation();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;
    setPickedImageFile(files[0]);
  };

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const pickedImageUrl = useMemo(() => {
    if (!pickedImageFile) return null;
    return URL.createObjectURL(pickedImageFile);
  }, [pickedImageFile]);

  const handleCancel = () => {
    setPickedImageFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (inputFileRef.current) inputFileRef.current.value = ""; // Reset input file html
  };

  const handleSaveCrop = async () => {
    if (!pickedImageUrl || !croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg({
        imageSrc: pickedImageUrl,
        pixelCrop: croppedAreaPixels,
      });
      if (!croppedFile) {
        toast.error("failed to get cropped image");
        return;
      }
      setCurrentBackground(URL.createObjectURL(croppedFile));
      const formData = new FormData();
      formData.append("file", croppedFile);
      await mutateAsync(formData);
      toast.success("wallpaper updated");
      handleCancel();
    } catch (error) {
      console.error("Gagal memotong gambar:", error);
    }
  };

  return (
    <>
      {!pickedImageUrl ? (
        children
      ) : (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Cropper
                image={pickedImageUrl}
                crop={crop}
                zoom={zoom}
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                minZoom={1}
                cropShape="rect"
                objectFit="cover"
                maxZoom={5}
                cropSize={{
                  height: wallpaperContainerHeight,
                  width: wallpaperContainerWidth,
                }}
                classes={{
                  containerClassName: "w-full h-full",
                  cropAreaClassName:
                    "border-none shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]",
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center w-full h-full justify-center gap-x-2 bg-muted/70 p-1 rounded-full">
              <Button
                onClick={handleCancel}
                size="icon-xs"
                variant={"secondary"}
                type="button"
                disabled={isPending}
                title="cancel"
              >
                <X />
              </Button>

              <Button
                onClick={handleSaveCrop}
                size="icon-xs"
                type="button"
                disabled={isPending}
                title="save"
              >
                {isPending ? <Loader2 className="animate-spin" /> : <Check />}
              </Button>
            </div>
          </div>
        </>
      )}
      <input
        type="file"
        hidden
        ref={inputFileRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default UpdatableWallpaper;
