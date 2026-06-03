import { cn } from "#/lib/utils";
import { motion } from "motion/react";
import { memo } from "react";

const Tags = memo(
  ({
    coordinate,
    taggedUser,
  }: {
    coordinate: { x: number; y: number };
    taggedUser: { username: string };
  }) => {
    return (
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 5 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 5 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className={cn(
          "pointer-events-none absolute z-50 flex flex-col select-none",
        )}
        style={{
          top: `${coordinate.y}%`,
          left: `${coordinate.x}%`,
          originY: 0,
        }}
      >
        <div
          className={cn(
            "tag-box pointer-events-auto relative top-[7px] flex flex-col rounded-lg bg-background shadow-2xl backdrop-blur-md transition-transform duration-200 ease-out",
            coordinate.x < 15
              ? "tag-box-left translate-x-[-15%] items-start"
              : coordinate.x > 85
                ? "tag-box-right translate-x-[-85%] items-end"
                : "tag-box-center -translate-x-1/2 items-center",
          )}
        >
          <div className="w-max max-w-32 py-2 px-2 text-xs text-foreground">
            <span className="line-clamp-1">{taggedUser.username}</span>
          </div>
        </div>
      </motion.div>
    );
  },
);

export default Tags;
