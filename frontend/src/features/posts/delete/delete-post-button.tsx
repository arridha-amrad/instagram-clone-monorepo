import { cn } from "#/lib/utils";
import { useDeletePostMutation } from "./mutation";

type Props = {
  postId: string;
};

export function DeletePostButton({ postId }: Props) {
  const { mutate, isPending } = useDeletePostMutation();
  return (
    <button
      className={cn("py-3 text-center text-destructive font-medium")}
      onClick={() => mutate(postId)}
      disabled={isPending}
    >
      Delete post
    </button>
  );
}
