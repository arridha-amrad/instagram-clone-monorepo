import { Button } from "#/components/ui/button";
import { useState } from "react";
import { useFollowUserMutation } from "./mutation";

type Props = {
  targetId: string;
  isFollow?: boolean;
};

export const SuggestedUserFollowButton = ({ targetId, isFollow }: Props) => {
  const { mutate } = useFollowUserMutation();
  return (
    <Button
      onClick={() => mutate(targetId)}
      variant={"ghost"}
      className="text-primary"
      size={"xs"}
    >
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
};

export const UserProfileFollowButton = ({ targetId, isFollow }: Props) => {
  const { mutate } = useFollowUserMutation();

  const [isF, setIsF] = useState(isFollow);

  return (
    <Button
      onClick={() => {
        setIsF((val) => !val);
        mutate(targetId);
      }}
      variant={isF ? "secondary" : "default"}
    >
      {isF ? "Following" : "Follow"}
    </Button>
  );
};
