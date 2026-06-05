import { Button } from "#/components/ui/button";
import { useFolloUserMutation } from "./mutation";

type Props = {
  targetId: string;
  isFollow?: boolean
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
