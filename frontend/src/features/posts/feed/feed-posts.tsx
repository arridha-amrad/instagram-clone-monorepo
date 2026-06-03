import { useQuery } from "@tanstack/react-query";
import FeedPost from "./feed-post";
import { AnimatePresence, motion } from "motion/react";
import { feedPostsQueryOptions } from "./query";
import type { TFeedPost } from "./api";

type Props = {
  posts: TFeedPost[]
}

export default function FeedPosts({posts}: Props) {
  const { data: feedPosts, isLoading } = useQuery({
    ...feedPostsQueryOptions(),
    initialData: posts
  });

  if (isLoading) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <AnimatePresence initial={false}>
      {feedPosts?.map((post) => (
        <motion.div
          key={post.id}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 40,
            opacity: { duration: 0.2 },
          }}
        >
          <FeedPost feedPost={post} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
