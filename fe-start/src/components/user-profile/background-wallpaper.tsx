import UpdatableWallpaper from "#/features/users/update-wallpaper/updatable-wallpaper";
import { useMeasure } from "@uidotdev/usehooks";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import DeleteWallpaperButton from "#/features/users/delete-wallpaper/delete-wallpaper-button";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";
import { useParams } from "@tanstack/react-router";

const defaultBgImg = "https://wallpapercave.com/wp/wp3280027.jpg";

const BackgroundWallpaper = ({
  backgroundImage,
}: {
  backgroundImage?: string;
}) => {
  const [wallpaperContainerRef, { width, height }] = useMeasure();
  const [currentBackground, setCurrentBackground] = useState(
    backgroundImage ?? defaultBgImg,
  );

  const inputFileRef = useRef<HTMLInputElement>(null);
  const { username } = useParams({ from: "/u/$username" });

  const { data: auth } = useQuery(authQueryOptions());

  useEffect(() => {
    setCurrentBackground(backgroundImage ?? defaultBgImg);
  }, [backgroundImage]);

  return (
    <div ref={wallpaperContainerRef} className="h-30 w-full relative group">
      <UpdatableWallpaper
        inputFileRef={inputFileRef}
        wallpaperContainerWidth={width ?? 0}
        wallpaperContainerHeight={height ?? 0}
        setCurrentBackground={setCurrentBackground}
      >
        <>
          <img
            className="h-full w-full object-cover object-center"
            src={currentBackground}
            alt="background wallpaper"
          />
          {auth && auth.user.username === username && (
            <div className="absolute transition-opacity duration-200 ease-linear inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-muted/50 gap-2">
              {backgroundImage && <DeleteWallpaperButton />}
              <Button
                onClick={() => inputFileRef.current?.click()}
                size={"sm"}
                variant={"outline"}
              >
                Change wallpaper
              </Button>
            </div>
          )}
        </>
      </UpdatableWallpaper>
    </div>
  );
};

export default BackgroundWallpaper;
