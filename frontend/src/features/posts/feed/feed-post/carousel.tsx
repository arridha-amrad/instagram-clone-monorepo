import EmblaProvider from "#/components/embla-provider";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { User } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import type { TFeedPost } from "../api";
import Tags from "./tags";

type Props = {
  feedPost: TFeedPost;
};

export default function Carousel({ feedPost }: Props) {
  const mediaUrls = useMemo(() => {
    return feedPost.media.map((m) => m.url);
  }, [feedPost.media]);

  const [openTag, setOpenTag] = useState(false);

  return (
    <EmblaProvider aspectRatio={feedPost.aspectRatio} url={mediaUrls}>
      <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
        {feedPost.media.map((media) => (
          <div
            className={cn(
              "w-full overflow-hidden",
              `aspect-[${feedPost.aspectRatio}]`,
            )}
            style={{
              aspectRatio: feedPost.aspectRatio,
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
              className="h-full w-full object-cover"
            />
            <AnimatePresence>
              {openTag &&
                media.taggedUsers.map((t) => (
                  <Tags
                    key={t.id}
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
