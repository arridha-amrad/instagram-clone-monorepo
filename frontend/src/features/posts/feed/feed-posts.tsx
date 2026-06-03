import { useQuery } from "@tanstack/react-query";
import FeedPost from "./feed-post";
import { AnimatePresence, motion } from "motion/react";
import { feedPostsQueryOptions } from "./query";

export default function FeedPosts() {
  const { data: feedPosts } = useQuery(feedPostsQueryOptions());

  return (
    <div className="flex-1 space-y-4 p-4">
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
      {/* <VideoPostItem />
    		<VideoPostItem />
    		<FeedPost />
    		<FeedPost /> */}
    </div>
  );
}
