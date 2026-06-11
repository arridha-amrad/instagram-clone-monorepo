import Avatar from "#/components/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { DeleteCommentButton } from "../delete/delete-comment-button";
import LikeCommentButton from "../like/like-comment-button";

export default function Replies() {
  return (
    <div className="flex gap-x-4 text-sm items-start">
      <Avatar src={null} />
      <div className="flex-1 space-y-2">
        <div className="w-full flex gap-x-4 items-start">
          <div className="flex-1">
            <span className="font-semibold pr-2">username</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
            eum.
          </div>
          <LikeCommentButton commentId={"1"} isLiked={false} />
        </div>
        <div className="flex text-xs items-center gap-4 text-muted-foreground">
          <span>{formatDistanceToNowStrict(new Date())}</span>
          {/* {comment._count.commentLikes > 0 && (
          <span>{comment._count.commentLikes} likes</span>
        )} */}
          <span>5 likes</span>

          <button
          // onClick={() =>
          //   setTarget({
          //     commentId: "1",
          //     postId: "1",
          //     username: comment.user.username,
          //   })
          // }
          >
            Reply
          </button>
          {/* {isCommentOwner && ( */}
          <DeleteCommentButton commentId={"1"} postId={"1"} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
