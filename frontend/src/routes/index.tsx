import { VolumeProvider } from "#/components/contexts/volume-context";
import { Sidebar } from "#/components/sidebar";
import FeedPosts from "#/features/posts/feed/feed-posts";
import { feedPostsQueryOptions } from "#/features/posts/feed/query";
import SuggestedUsers from "#/features/users/suggested-users/list";
import { authClient } from "#/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Instagram - Home" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: "/auth/login" });
    }
    queryClient.setQueryData(["auth"], session);
    return { session: session.data };
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(feedPostsQueryOptions());
  },
  component: Home,
});

function Home() {
  const { session } = Route.useRouteContext();
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <VolumeProvider>
        <FeedPosts />
        <div className="sticky top-0 hidden h-svh w-xs p-4 lg:block">
          <SuggestedUsers />
        </div>
      </VolumeProvider>
    </div>
  );
}
