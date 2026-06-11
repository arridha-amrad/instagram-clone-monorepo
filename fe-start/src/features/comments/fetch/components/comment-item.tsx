import Avatar from "#/components/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import LikeCommentButton from "../../like/like-comment-button";
import type { TComment } from "../api";
import { DeleteCommentButton } from "../../delete/delete-comment-button";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";
import { useReplyStore } from "#/stores/useReplyStore";
import Replies from "../../replies";

type Props = {
  comment: TComment;
};

export default function CommentItem({ comment }: Props) {
  const { postId } = useParams({ from: "/p/$postId" });
  const { data: authUser } = useQuery(authQueryOptions());
  const isCommentOwner = comment.user.id === authUser?.user.id;

  const setTarget = useReplyStore((state) => state.setTarget);

  return (
    <div className="flex gap-x-4 text-sm items-start">
      <Avatar src={comment.user.image} />
      <div className="flex-1 space-y-2">
        <div className="w-full flex gap-x-4">
          <div className="flex-1">
            <span className="font-semibold pr-2">{comment.user.username}</span>
            {comment.content}
          </div>
          <LikeCommentButton commentId={comment.id} isLiked={comment.isLiked} />
        </div>
        <div className="flex text-xs items-center gap-4 text-muted-foreground">
          <span>{formatDistanceToNowStrict(new Date(comment.createdAt))}</span>
          {comment._count.commentLikes > 0 && (
            <span>{comment._count.commentLikes} likes</span>
          )}
          <button
            onClick={() =>
              setTarget({
                commentId: comment.id,
                postId: comment.postId,
                username: comment.user.username,
              })
            }
          >
            Reply
          </button>
          {isCommentOwner && (
            <DeleteCommentButton commentId={comment.id} postId={postId} />
          )}
        </div>

        <Replies />
      </div>
      {/* <div className="flex flex-col gap-4">
        <LikeCommentButton commentId={comment.id} isLiked={comment.isLiked} />
      </div> */}
    </div>
  );
}
