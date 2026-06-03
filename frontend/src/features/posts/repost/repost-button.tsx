import { RepostIcon } from "#/components/icons/repost-icon";
import { useRepostMutation } from "./mutation";

interface Props {
  postId: string;
  isRepost: boolean;
  totalRepost: number;
}

export default function RepostButton({ postId, isRepost, totalRepost }: Props) {
  const { mutate } = useRepostMutation();

  return (
    <button onClick={() => mutate(postId)} className="flex items-center gap-2">
      {isRepost ? <RepostIcon className="text-green-500" /> : <RepostIcon />}
      {totalRepost > 0 && (
        <span className="text-sm font-medium">{totalRepost}</span>
      )}
    </button>
  );
}
