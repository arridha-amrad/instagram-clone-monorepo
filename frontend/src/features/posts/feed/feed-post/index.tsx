import { CommentIcon } from "#/components/icons/comment-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CommentForm from "@/features/comments/create/comment-form";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import BookmarkPostButton from "../../bookmark/bookmark-post-button";
import { LikePostButton } from "../../like/like-post-button";
import RepostButton from "../../repost/repost-button";
import type { TFeedPost } from "../api";
import Actions from "./actions";
import Caption from "./caption";
import Carousel from "./carousel";
import { Comments } from "./comments";
import FeedPostHeader from "./header";
import HeaderOptions from "./header-options";

// 1. Import Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function FeedPost({ feedPost }: { feedPost: TFeedPost }) {
  const timeAgo = useMemo(() => {
    return formatDistanceToNowStrict(new Date(feedPost.createdAt), {
      addSuffix: true,
    });
  }, [feedPost.createdAt]);

  return (
    <Card className="mx-auto max-w-full border-none shadow-none md:max-w-117.5 md:border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <FeedPostHeader feedPost={feedPost}>
          <HeaderOptions postId={feedPost.id} userId={feedPost.userId} />
        </FeedPostHeader>
      </CardHeader>
      <CardContent className="overflow-hidden p-0">
        <Carousel feedPost={feedPost} />
      </CardContent>
      <CardContent>
        <Actions>
          <LikePostButton
            postId={feedPost.id}
            isLiked={feedPost.isLiked}
            totalLikes={feedPost._count.postLikes}
          />
          <CommentButton totalComments={feedPost._count.comments} />
          <RepostButton
            postId={feedPost.id}
            isRepost={feedPost.isRepost}
            totalRepost={feedPost._count.reposts}
          />
          <BookmarkPostButton
            postId={feedPost.id}
            isBookmarked={feedPost.isBookmarked}
            totalBookmarks={feedPost._count.bookmarks}
          />
        </Actions>
        <Caption
          authorUsername={feedPost.user?.username}
          timeAgo={timeAgo}
          caption={feedPost.caption}
        />
      </CardContent>

      {/* 2. Gunakan AnimatePresence agar transisi keluar/masuk DOM berjalan mulus */}
      <AnimatePresence initial={false}>
        {feedPost.comments.length > 0 && (
          <CardContent>
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="overflow-hidden"
            >
              <Comments
                comments={feedPost.comments.map((c) => ({
                  postId: c.postId,
                  id: c.id,
                  comment: c.comment,
                  userId: c.userId,
                  username: c.username,
                }))}
              />
            </motion.div>
          </CardContent>
        )}
      </AnimatePresence>

      <CardFooter>
        <CommentForm postId={feedPost.id} />
      </CardFooter>
    </Card>
  );
}

const CommentButton = ({ totalComments }: { totalComments: number }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate({ to: "/" })}
      className="flex items-center gap-2"
    >
      <CommentIcon />
      {totalComments > 0 && (
        <span className="text-sm font-medium">{totalComments}</span>
      )}
    </button>
  );
};
