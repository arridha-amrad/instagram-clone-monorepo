import { Button } from "#/components/ui/button";
import { useState } from "react";
import { useFolloUserMutation } from "./mutation";

type Props = {
  targetId: string;
  isFollow?: boolean;
};

export const SuggestedUserFollowButton = ({ targetId, isFollow }: Props) => {
  const { mutate } = useFolloUserMutation();
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
  const { mutate } = useFolloUserMutation();

  const [isF, setIsF] = useState(isFollow);

  return (
    <Button
      onClick={() => {
        setIsF((val) => !val);
        mutate(targetId);
      }}
      variant={"default"}
    >
      {isF ? "Following" : "Follow"}
    </Button>
  );
};
