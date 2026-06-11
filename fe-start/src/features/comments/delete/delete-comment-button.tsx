import { Trash } from "lucide-react";
import { useDeleteCommentMutation } from "./mutation";

export function DeleteCommentButton({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const { mutate } = useDeleteCommentMutation(postId);
  return (
    <button
      onClick={() => mutate(commentId)}
      title="delete"
      className="group size-max"
    >
      <Trash className="text-muted-foreground group-hover:text-destructive size-3" />
    </button>
  );
}
