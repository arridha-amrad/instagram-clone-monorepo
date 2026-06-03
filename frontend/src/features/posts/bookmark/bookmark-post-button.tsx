import { BookmarkIcon } from "lucide-react";
import { useBookmarkPostMutation } from "./mutation";

export default function BookmarkPostButton({
  postId,
  isBookmarked,
  totalBookmarks,
}: {
  postId: string;
  isBookmarked: boolean;
  totalBookmarks: number;
}) {
  const { mutate } = useBookmarkPostMutation();
  return (
    <button onClick={() => mutate(postId)} className="flex items-center gap-2">
      {isBookmarked ? (
        <BookmarkIcon className="fill-amber-500 hover:scale-110 stroke-amber-500" />
      ) : (
        <BookmarkIcon className="hover:scale-110 transition-transform duration-100 ease-in-out" />
      )}
      {totalBookmarks > 0 && (
        <span className="text-sm font-medium">{totalBookmarks}</span>
      )}
    </button>
  );
}
