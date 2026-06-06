import UpdatableAvatar from "#/features/users/update-avatar/updatable-avatar";
import { useMeasure } from "@uidotdev/usehooks";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Avatar from "../avatar";
import { Button } from "../ui/button";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";

type Props = {
  image: string | null;
};

export default function ProfileAvatar({ image }: Props) {
  const [avatarContainerRef, { width, height }] = useMeasure();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { username } = useParams({ from: "/u/$username" });
  const { data: authUser } = useQuery(authQueryOptions());

  const [currentAvatarImage, setCurrentAvatarImage] = useState(
    image ?? "/default.jpg",
  );

  useEffect(() => {
    setCurrentAvatarImage(image ?? "/default.jpg");
  }, [image]);

  const isAuthUser = authUser && authUser.user.username === username;

  return (
    <div className="absolute bottom-4 left-4 group z-10">
      <div
        ref={avatarContainerRef}
        className="relative size-36 flex items-center justify-center rounded-full bg-muted"
      >
        <UpdatableAvatar
          inputFileRef={isAuthUser ? inputFileRef : null}
          avatarContainerWidth={width ?? 0}
          avatarContainerHeight={height ?? 0}
          setCurrentAvatar={setCurrentAvatarImage}
        >
          <>
            <Avatar className="size-full" src={currentAvatarImage} />
            {isAuthUser && (
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
            )}
          </>
        </UpdatableAvatar>
      </div>
    </div>
  );
}
