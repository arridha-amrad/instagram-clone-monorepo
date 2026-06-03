import { HeartFilledIcon, HeartIcon } from "#/components/icons/heart-icon";
import { useLikePostMutation } from "./mutation";

type Props = {
  postId: string;
  isLiked: boolean;
  totalLikes: number;
};

export const LikePostButton = ({ postId, isLiked, totalLikes }: Props) => {
  const { mutate: likePost } = useLikePostMutation();
  return (
    <button
      onClick={() => likePost(postId)}
      className="flex items-center gap-2"
    >
      {isLiked ? (
        <HeartFilledIcon className="fill-rose-500 hover:scale-110" />
      ) : (
        <HeartIcon className="hover:scale-110 transition-transform duration-100 ease-in-out" />
      )}
      {totalLikes > 0 && (
        <span className="text-sm font-medium">{totalLikes}</span>
      )}
    </button>
  );
};
