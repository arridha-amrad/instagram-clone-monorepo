import { Button } from "#/components/ui/button";
import { getCroppedImg } from "#/lib/utils";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { useUpdateAvatarMutation } from "./mutation";
import toast from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  inputFileRef: React.RefObject<HTMLInputElement | null> | null;
  avatarContainerWidth: number;
  avatarContainerHeight: number;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export default function UpdatableAvatar({
  inputFileRef,
  children,
  avatarContainerWidth,
  avatarContainerHeight,
  setCurrentAvatar,
}: Props) {
  const [pickedImageFile, setPickedImageFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const pickedImageUrl = useMemo(() => {
    if (!pickedImageFile) return null;
    return URL.createObjectURL(pickedImageFile);
  }, [pickedImageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPickedImageFile(files[0]);
    }
  };

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const { mutateAsync, isPending } = useUpdateAvatarMutation();

  const handleSaveCrop = async () => {
    if (!pickedImageUrl || !croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg(
        pickedImageUrl,
        croppedAreaPixels,
      );
      setCurrentAvatar(URL.createObjectURL(croppedFile));
      const formData = new FormData();
      formData.append("file", croppedFile);
      await mutateAsync(formData);
      toast.success("Avatar updated successfully");
      handleCancel();
    } catch (error) {
      toast.error("Failed to update avatar");
      console.error("Gagal memotong gambar:", error);
    }
  };

  const handleCancel = () => {
    setPickedImageFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (inputFileRef?.current) inputFileRef.current.value = ""; // Reset input file html
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
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                minZoom={1}
                maxZoom={3}
                cropSize={{
                  width: avatarContainerWidth,
                  height: avatarContainerHeight,
                }}
                classes={{
                  containerClassName: "w-full h-full",
                  cropAreaClassName:
                    "border-none shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]",
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-5 inset-x-0 z-30 pointer-events-auto">
            <div className="flex relative z-999 justify-center gap-x-3 px-1">
              <Button
                onClick={handleCancel}
                size="icon-xs"
                type="button"
                variant={"secondary"}
                disabled={isPending}
                title="cancel"
              >
                <X className="size-4" />
              </Button>

              <Button
                onClick={handleSaveCrop}
                variant="default"
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
        accept="image/*"
        hidden
        ref={inputFileRef}
        onChange={handleFileChange}
      />
    </>
  );
}
