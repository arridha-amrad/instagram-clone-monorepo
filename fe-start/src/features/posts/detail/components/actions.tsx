import { CommentIcon } from "#/components/icons/comment-icon";
import { SendIcon } from "#/components/icons/send-icon";
import BookmarkPostButton from "../../bookmark/bookmark-post-button";
import { LikePostButton } from "../../like/like-post-button";
import RepostButton from "../../repost/repost-button";
import type { TDetailPost } from "../api";

type Props = {
  post: TDetailPost;
};

export default function Actions({ post }: Props) {
  return (
    <div className="flex items-center gap-4 px-4">
      <LikePostButton isLiked={post.isLiked} postId={post.id} />
      <button>
        <CommentIcon />
      </button>
      <RepostButton isRepost={post.isRepost} postId={post.id} />
      <button>
        <SendIcon />
      </button>
      <div className="flex-1" />
      <BookmarkPostButton isBookmarked={post.isBookmarked} postId={post.id} />
    </div>
  );
}
