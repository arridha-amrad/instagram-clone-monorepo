import { Sidebar } from "#/components/sidebar";
import { Separator } from "#/components/ui/separator";
import { authQueryOptions } from "#/features/auth/query";
import CommentForm from "#/features/comments/create/comment-form";
import Actions from "#/features/posts/detail/components/actions";
import Carousel from "#/features/posts/detail/components/carousel";
import Comments from "#/features/comments/fetch/components/comments";
import Content from "#/features/posts/detail/components/content";
import Header from "#/features/posts/detail/components/header";
import { postDetailQueryOptions } from "#/features/posts/detail/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMeasure } from "@uidotdev/usehooks";
import { formatDistanceToNowStrict } from "date-fns";
import { Loader2 } from "lucide-react";
import { commentsQueryOptions } from "#/features/comments/fetch/query";

export const Route = createFileRoute("/p/$postId")({
  head: () => ({
    meta: [{ title: "Instagram Clone" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(authQueryOptions());
    return {
      session,
    };
  },
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(postDetailQueryOptions(postId));
    await queryClient.ensureQueryData(commentsQueryOptions(postId));
  },
  notFoundComponent: () => <p>post not found</p>,
  errorComponent: () => <div>something went wrong</div>,
  pendingComponent: () => <Loader2 className="animate-spin size-4" />,
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(postDetailQueryOptions(postId));
  const [ref, { height }] = useMeasure();
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <div className="flex-1 flex items-start max-w-250 mx-auto p-4">
        <div className="flex w-full rounded-xl overflow-hidden">
          <div
            ref={ref}
            style={{
              aspectRatio: data.aspectRatio === "RATIO_1_1" ? "1 / 1" : "4 / 5",
            }}
            className="grow min-w-0 overflow-hidden"
          >
            <Carousel />
          </div>

          <div
            style={{ height: height ?? 0 }}
            className="w-87.5 shrink-0 bg-muted flex flex-col"
          >
            <Header post={data} />
            <Separator />
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              <Content post={data} />
              <Comments />
            </div>
            <div className="w-full space-y-4 py-4">
              <Actions post={data} />
              <div className="px-4">
                {data._count.postLikes > 0 && (
                  <div className="text-sm">
                    <span className="font-semibold pr-1">
                      {data._count.postLikes}
                    </span>
                    likes
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNowStrict(data.createdAt)}
                </div>
              </div>
              <Separator />
              <div className="px-2">
                <CommentForm postId={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
