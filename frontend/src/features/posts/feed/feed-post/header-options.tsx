import { Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeletePostButton } from "../../delete/delete-post-button";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";
// import { useDeletePostMutation } from "#/features/delete-post/useMutation";

type Props = {
  postId: string;
  userId: string;
};

export default function FeedPostOptions({ postId, userId }: Props) {
  // const { mutate } = useDeletePostMutation();
  const { data } = useQuery(authQueryOptions());
  const options = [
    // {
    //   title: "Delete",
    //   isDestructive: true,
    //   onClick: () => mutate(postId),
    // },
    {
      title: "Report",
      isDestructive: true,
    },
    {
      title: "Unfollow",
      isDestructive: true,
    },
    {
      title: "Add to favorites",
      isDestructive: false,
    },
    {
      title: "Go to post",
      isDestructive: false,
    },
    {
      title: "Copy link",
      isDestructive: false,
    },
    {
      title: "About this account",
      isDestructive: false,
    },
  ];

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>More Options</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader className="sr-only">
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>More Options</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {data?.data?.user && data.data.user.id === userId && (
            <>
              <DeletePostButton postId={postId} />
              <Separator orientation="horizontal" />
            </>
          )}
          {options.map((item, i) => (
            <Fragment key={item.title}>
              {false ? (
                <button
                  className={cn(
                    "py-3 text-center",
                    item.isDestructive ? "font-medium text-destructive" : "",
                  )}
                  // onClick={item.onClick}
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  className={cn(
                    "py-3 text-center",
                    item.isDestructive ? "font-medium text-destructive" : "",
                  )}
                  to="/"
                >
                  {item.title}
                </Link>
              )}
              {i !== options.length - 1 && (
                <Separator orientation="horizontal" />
              )}
            </Fragment>
          ))}
          <Separator orientation="horizontal" />
          <DialogClose asChild>
            <button className="py-3 text-center">Cancel</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
