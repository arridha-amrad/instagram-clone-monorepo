import Avatar from "#/components/avatar";
import UsernameHoverCard from "#/components/username-hover-card";
import { SuggestedUserFollowButton } from "../follow-user/follow-user-button";

type Props = {
  image: string;
  userId: string;
  username: string;
  name: string;
  isFollow?: boolean;
};

export default function SuggestedUser({
  image,
  userId,
  name,
  username,
  isFollow,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-md px-1 py-1.5 text-left text-sm">
      <Avatar src={image} />
      <div className="grid flex-1 space-y-1 text-left text-sm">
        <UsernameHoverCard
          userId={userId}
          image={image}
          name={name}
          username={username}
        />
        <span className="truncate text-xs text-muted-foreground">
          Recommended for you
        </span>
      </div>
      <SuggestedUserFollowButton isFollow={isFollow} targetId={userId} />
    </div>
  );
}
