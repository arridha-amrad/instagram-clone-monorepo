import { Button } from "#/components/ui/button";
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
    <Button
      onClick={() => mutate(commentId)}
      title="delete"
      size={"icon-sm"}
      className="rounded-full group"
      variant={"ghost"}
    >
      <Trash className="text-muted-foreground group-hover:text-destructive" />
    </Button>
  );
}
