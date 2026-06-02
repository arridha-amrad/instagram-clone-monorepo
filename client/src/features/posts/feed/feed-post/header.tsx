import { useMemo, type ReactNode } from "react";
import AvatarHeader from "./header-avatar";
import type { TFeedPost } from "../api";

type Props = {
  feedPost: TFeedPost;
  children: ReactNode;
};

export default function FeedPostHeader({ feedPost, children }: Props) {
  const allAvatars = useMemo(() => {
    return [
      feedPost.user?.image,
      ...feedPost.collaborators.map((c) => c.user?.image),
    ].filter((v): v is string => typeof v === "string");
  }, [feedPost.id]);

  const authorUsername = useMemo(() => {
    return feedPost.user?.username;
  }, [feedPost.user]);

  const collaboratorUsernames = useMemo(() => {
    return feedPost.collaborators.map((c) => c.user?.username);
  }, [feedPost.collaborators]);

  const location = useMemo(() => {
    return feedPost.location;
  }, [feedPost.location]);

  return (
    <>
      <div className="flex items-center gap-3">
        <AvatarHeader images={allAvatars} />
        <div className="flex flex-col gap-1">
          <div>
            <span className="cursor-pointer text-sm font-semibold hover:underline">
              {authorUsername}
            </span>
            {collaboratorUsernames.length > 0 && <span> and </span>}
            {collaboratorUsernames.length > 1 ? (
              <span className="cursor-pointer text-sm font-semibold">
                {collaboratorUsernames.length} others
              </span>
            ) : (
              <span className="cursor-pointer text-sm font-semibold">
                {collaboratorUsernames[0]}
              </span>
            )}
          </div>
          <span className="text-xs leading-none text-muted-foreground">
            {location}
          </span>
        </div>
      </div>
      {children}
    </>
  );
}
