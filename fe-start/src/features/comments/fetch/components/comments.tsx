import CommentItem from "#/features/comments/fetch/components/comment-item";
import { useQuery } from "@tanstack/react-query";
import { commentsQueryOptions } from "../query";
import { useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

export default function Comments() {
  const { postId } = useParams({ from: "/p/$postId" });
  const { data } = useQuery(commentsQueryOptions(postId));
  return (
    <div className="flex flex-col gap-y-4 py-4">
      <AnimatePresence initial={false}>
        {data?.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="text-sm overflow-hidden"
          >
            <CommentItem key={c.id} comment={c} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
