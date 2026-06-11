import { useParams } from "@tanstack/react-router";
import { useLikeCommentMutation } from "./mutation";
import { HeartFilledIcon, HeartIcon } from "#/components/icons/heart-icon";

type Props = {
  isLiked: boolean;
  commentId: string;
};

export default function LikeCommentButton({ isLiked, commentId }: Props) {
  const { postId } = useParams({ from: "/p/$postId" });
  const { mutate } = useLikeCommentMutation(postId);
  return (
    <button onClick={() => mutate(commentId)} className="pt-1">
      {isLiked ? (
        <HeartFilledIcon className="size-3 fill-rose-500" />
      ) : (
        <HeartIcon className="size-3 text-muted-foreground" />
      )}
    </button>
  );
}
