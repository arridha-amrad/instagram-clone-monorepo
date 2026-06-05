import { VolumeProvider } from "#/components/contexts/volume-context";
import { Sidebar } from "#/components/sidebar";
import { getCurrSession } from "#/features/auth/api";
import FeedPosts from "#/features/posts/feed/feed-posts";
import { feedPostsQueryOptions } from "#/features/posts/feed/query";
import SuggestedUsers from "#/features/users/suggested-users/list";
import { suggestedUsersQueryOptions } from "#/features/users/suggested-users/query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Instagram Clone - Home" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const sess = await getCurrSession();
    if (!sess) {
      throw redirect({ to: "/auth/login" });
    }
    queryClient.setQueryData(["auth"], sess);
    return { session: sess };
  },
  errorComponent: ({ error }) => {
    return <div>{JSON.stringify(error)}</div>;
  },
  loader: async ({ context: { queryClient } }) => {
    const [posts, users] = await Promise.all([
      queryClient.ensureQueryData(feedPostsQueryOptions()),
      queryClient.ensureQueryData(suggestedUsersQueryOptions()),
    ]);
    return {
      posts,
      users,
    };
  },
  component: Home,
});

function Home() {
  const { session } = Route.useRouteContext();
  const { posts, users } = Route.useLoaderData();
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <div className="flex-1 space-y-4 p-4">
        <VolumeProvider>
          <FeedPosts posts={posts!} />
        </VolumeProvider>
      </div>
      <div className="sticky top-0 hidden h-svh w-xs p-4 lg:block">
        <SuggestedUsers users={users!} />
      </div>
    </div>
  );
}
