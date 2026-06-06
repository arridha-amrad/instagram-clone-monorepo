import { Camera, Check, X } from "lucide-react";
import Avatar from "../avatar";
import { Button } from "../ui/button";
import Cropper, { type Area } from "react-easy-crop";
import { useMemo, useRef, useState } from "react";
import { getCroppedImg } from "#/lib/utils";

type Props = {
  image: string | null;
  onUpload?: (file: File) => Promise<void> | void;
};

export default function ProfileAvatar({ image, onUpload }: Props) {
  const [currentAvatarImage, setCurrentAvatarImage] = useState(
    image ?? "/default.jpg",
  );
  const [pickedImageFile, setPickedImageFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

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

  const handleSaveCrop = async () => {
    if (!pickedImageUrl || !croppedAreaPixels) return;
    try {
      setIsUploading(true);
      const croppedFile = await getCroppedImg(
        pickedImageUrl,
        croppedAreaPixels,
      );
      setCurrentAvatarImage(URL.createObjectURL(croppedFile));
      if (onUpload) {
        await onUpload(croppedFile);
      } else {
        console.log("File siap di-upload:", croppedFile);
      }
      handleCancel();
    } catch (error) {
      console.error("Gagal memotong gambar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPickedImageFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (inputFileRef.current) inputFileRef.current.value = ""; // Reset input file html
  };

  return (
    <div className="absolute bottom-4 left-4 group z-10">
      {/* Container utama seukuran Avatar */}
      <div className="relative size-36 flex items-center justify-center rounded-full bg-muted">
        {/* TAMPILAN 1: Avatar Normal */}
        {!pickedImageUrl ? (
          <>
            <Avatar className="size-full" src={currentAvatarImage} />

            {/* Tombol Hover Kamera */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear">
              <Button
                onClick={() => inputFileRef.current?.click()}
                title="Change avatar"
                variant="secondary"
                size="icon"
                type="button"
              >
                <Camera />
              </Button>
            </div>
          </>
        ) : (
          /* TAMPILAN 2: Mode Cropping Inline (Langsung di tempat) */
          <>
            {/* 1. Box Khusus Cropper (Dipaksa bundar sempurna agar bayangan shadow hitam tidak luber keluar) */}
            <div className="absolute inset-0 overflow-hidden z-20">
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
                  cropSize={{ width: 136, height: 136 }}
                  classes={{
                    containerClassName: "w-full h-full",
                    cropAreaClassName:
                      "border-none shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]",
                  }}
                />
              </div>
            </div>

            {/* 2. Box Tombol Aksi (Dikeluarkan dari overflow-hidden agar bisa diklik dengan aman) */}
            <div className="absolute -bottom-5 inset-x-0 z-30 pointer-events-none">
              <div className="flex justify-center gap-x-3 px-1">
                <Button
                  onClick={handleCancel}
                  size="icon-xs"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md pointer-events-auto size-8"
                  type="button"
                  disabled={isUploading}
                  title="cancel"
                >
                  <X className="size-4" />
                </Button>

                <Button
                  onClick={handleSaveCrop}
                  variant="default"
                  size="icon-xs"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md pointer-events-auto size-8"
                  type="button"
                  disabled={isUploading}
                  title="save"
                >
                  <Check className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Input File Tersembunyi */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputFileRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
