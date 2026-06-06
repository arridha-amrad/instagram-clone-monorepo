import { useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import Cropper, { type Area } from "react-easy-crop";
import { useMeasure } from "@uidotdev/usehooks";
import { Check, X } from "lucide-react";
import { getCroppedImg } from "#/lib/utils";
import { useUpdateBgWallpaperMutation } from "#/features/users/update-wallpaper/mutation";
import toast from "react-hot-toast";

const defaultBgImg =
  "https://images.unsplash.com/photo-1769540209843-c1e6a462b9d3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const BackgroundWallpaper = ({
  backgroundImage,
}: {
  backgroundImage?: string;
}) => {
  const [wallpaperContainerRef, { width, height }] = useMeasure();
  const [pickedImageFile, setPickedImageFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [currentBackgroud, setCurrentBackgroud] = useState(
    backgroundImage ?? defaultBgImg,
  );

  const { mutateAsync, isPending } = useUpdateBgWallpaperMutation();

  const inputFileRef = useRef<HTMLInputElement>(null);

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
      const croppedFile = await getCroppedImg(
        pickedImageUrl,
        croppedAreaPixels,
      );
      setCurrentBackgroud(URL.createObjectURL(croppedFile));
      const formData = new FormData();
      formData.append("file", croppedFile);
      mutateAsync(formData);
      handleCancel();
      toast.success("wallpaper updated");
    } catch (error) {
      console.error("Gagal memotong gambar:", error);
    }
  };

  return (
    <div ref={wallpaperContainerRef} className="h-30 w-full relative group">
      {!pickedImageUrl ? (
        <>
          <img
            className="h-full w-full object-cover object-bottom"
            src={currentBackgroud}
            alt="background wallpaper"
          />
          <div className="absolute transition-opacity duration-200 ease-linear inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-muted/50">
            <Button
              onClick={() => inputFileRef.current?.click()}
              size={"sm"}
              variant={"outline"}
            >
              Change wallpaper
            </Button>
          </div>
        </>
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
                cropSize={{ height: height ?? 0, width: width ?? 0 }}
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
                <Check className="size-4" />
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
    </div>
  );
};

export default BackgroundWallpaper;
