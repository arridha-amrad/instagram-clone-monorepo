import EmblaProvider from "#/components/embla-provider";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { User } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import Tags from "./tags";
import { useQuery } from "@tanstack/react-query";
import { postDetailQueryOptions } from "../query";
import { useParams } from "@tanstack/react-router";

export default function PostDetailCarousel() {
  const { postId } = useParams({ from: "/p/$postId" });
  const { data: post } = useQuery(postDetailQueryOptions(postId));

  const mediaUrls = useMemo(() => {
    return post?.media.sort((a, b) => a.order - b.order).map((m) => m.url);
  }, [post?.media]);

  const [openTag, setOpenTag] = useState(false);

  if (!post) return null;

  return (
    <EmblaProvider aspectRatio={post.aspectRatio} url={mediaUrls ?? []}>
      <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
        {post.media.map((media) => (
          <div
            className={cn("w-full overflow-hidden")}
            style={{
              aspectRatio: post.aspectRatio === "RATIO_4_5" ? "4 / 5" : "1 / 1",
              transform: "translate3d(0, 0, 0)",
              flex: "0 0 100%",
              minWidth: 0,
              paddingLeft: "1rem",
            }}
            ref={null}
            key={media.id}
          >
            <img
              src={media.url}
              alt="post content"
              style={{
                aspectRatio:
                  post.aspectRatio === "RATIO_4_5" ? "4 / 5" : "1 / 1",
              }}
              className="object-cover"
            />
            <AnimatePresence>
              {openTag &&
                media.taggedUsers.map((t, i) => (
                  <Tags
                    key={i}
                    coordinate={{ x: t.coordinateX, y: t.coordinateY }}
                    taggedUser={{ username: t.user?.username ?? "" }}
                  />
                ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <Button
          onClick={() => setOpenTag((val) => !val)}
          className="rounded-full"
          variant="secondary"
          size="icon-xs"
        >
          <User />
        </Button>
      </div>
    </EmblaProvider>
  );
}
