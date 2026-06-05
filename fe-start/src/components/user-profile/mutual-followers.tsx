import Avatar from "../avatar";
import { AvatarGroup } from "../ui/avatar";

export default function MutualFollowers() {
  return (
    <div className="flex gap-x-2 items-center">
      <AvatarGroup className="grayscale">
        <Avatar src="https://github.com/shadcn.png" />
        <Avatar src="https://github.com/maxleiter.png" />
        <Avatar src="https://github.com/evilrabbit.png" />
      </AvatarGroup>
      <span className="text-sm text-muted-foreground">
        Followed by Shadcn, Max Leiter, Evil Rabbit
      </span>
    </div>
  );
}
