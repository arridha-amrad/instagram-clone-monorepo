import { Button } from "#/components/ui/button";
import { Trash } from "lucide-react";
import type { TFeedPost } from "../api";
import { DeleteCommentButton } from "#/features/comments/delete/delete-comment-button";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  comments: TFeedPost["comments"];
};

export const Comments = ({ comments }: Props) => {
  return (
    <div className="flex flex-col">
      <AnimatePresence initial={false}>
        {comments.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="text-sm overflow-hidden"
          >
            <div className="pb-2">
              <CommentItem
                comment={c.comment}
                postId={c.postId}
                commentId={c.id}
                username={c.username}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const CommentItem = ({
  comment,
  username,
  commentId,
  postId,
}: {
  username: string;
  comment: string;
  commentId: string;
  postId: string;
}) => {
  return (
    <div className="flex items-start gap-x-3 justify-between">
      <div>
        <span className="font-semibold pr-2">{username}</span>
        {comment}
      </div>
      <div className="-mt-2 shrink-0">
        <DeleteCommentButton commentId={commentId} postId={postId} />
      </div>
    </div>
  );
};

const ExampleComment = () => {
  return (
    <div className="flex items-start gap-x-3 justify-between">
      <div>
        <span className="font-semibold pr-2">arridha08</span>
        Komentar contoh Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Hic, id. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Tenetur hic corporis, laboriosam iusto cumque est quis maiores magni
        error. Deleniti.
      </div>
      <div className="-mt-2 shrink-0">
        <Button
          title="delete"
          size={"icon-sm"}
          className="rounded-full group"
          variant={"ghost"}
        >
          <Trash className="text-muted-foreground group-hover:text-destructive" />
        </Button>
      </div>
    </div>
  );
};
