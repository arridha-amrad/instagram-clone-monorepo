import Avatar from "#/components/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { Heart } from "lucide-react";

export default function Comments() {
  return (
    <div className="flex flex-col gap-y-4 py-4">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}

const CommentItem = () => {
  return (
    <div className="flex gap-x-4 text-sm">
      <Avatar />
      <div className="flex-1 space-y-2">
        <div className="w-full">
          <span className="font-semibold">username</span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          veniam!
        </div>
        <div className="flex text-xs items-center gap-4 text-muted-foreground">
          <span>{formatDistanceToNowStrict(new Date())}</span>
          <span>4 likes</span>
          <button>Reply</button>
        </div>
      </div>
      <button>
        <Heart className="size-3" />
      </button>
    </div>
  );
};
