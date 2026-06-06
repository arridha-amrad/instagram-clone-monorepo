import UpdatableWallpaper from "#/features/users/update-wallpaper/updatable-wallpaper";
import { useMeasure } from "@uidotdev/usehooks";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import DeleteWallpaperButton from "#/features/users/delete-wallpaper/delete-wallpaper-button";

const defaultBgImg = "https://wallpapercave.com/wp/wp3280027.jpg";

const BackgroundWallpaper = ({
  backgroundImage,
}: {
  backgroundImage?: string;
}) => {
  const [wallpaperContainerRef, { width, height }] = useMeasure();
  const [currentBackgroud, setCurrentBackgroud] = useState(
    backgroundImage ?? defaultBgImg,
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  // ✅ Sinkronisasi State Lokal dengan Perubahan Props/Cache
  useEffect(() => {
    // Jika props backgroundImage berubah (termasuk jadi null/undefined setelah didelete)
    // Kembalikan state lokal ke nilai props baru tersebut, atau fallback ke defaultBgImg
    setCurrentBackgroud(backgroundImage ?? defaultBgImg);
  }, [backgroundImage]);

  return (
    <div ref={wallpaperContainerRef} className="h-30 w-full relative group">
      <UpdatableWallpaper
        inputFileRef={inputFileRef}
        wallpaperContainerWidth={width ?? 0}
        wallpaperContainerHeight={height ?? 0}
        setCurrentBackgroud={setCurrentBackgroud}
      >
        <>
          <img
            className="h-full w-full object-cover object-center"
            src={currentBackgroud}
            alt="background wallpaper"
          />
          <div className="absolute transition-opacity duration-200 ease-linear inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-muted/50 gap-2">
            {/* ✅ Tampilkan tombol delete hanya jika wallpaper bukan gambar default */}
            {backgroundImage && <DeleteWallpaperButton />}

            <Button
              onClick={() => inputFileRef.current?.click()}
              size={"sm"}
              variant={"outline"}
            >
              Change wallpaper
            </Button>
          </div>
        </>
      </UpdatableWallpaper>
    </div>
  );
};

export default BackgroundWallpaper;
