import CommentItem from "#/features/comments/fetch/components/comment-item";
import { useQuery } from "@tanstack/react-query";
import { commentsQueryOptions } from "../query";
import { useParams } from "@tanstack/react-router";

export default function Comments() {
  const { postId } = useParams({ from: "/p/$postId" });
  const { data } = useQuery(commentsQueryOptions(postId));
  return (
    <div className="flex flex-col gap-y-4 py-4">
      {data?.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
