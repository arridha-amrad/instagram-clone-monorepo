import Avatar from "#/components/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import type { TDetailPost } from "../api";

type Props = {
  post: TDetailPost;
};

export default function Content({ post }: Props) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <Avatar src={post.user.image} />
        <div className="space-y-2">
          <div className="text-sm whitespace-break-spaces">
            <span className="font-semibold pr-2">{post.user.username}</span>
            {post.caption}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNowStrict(post.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
