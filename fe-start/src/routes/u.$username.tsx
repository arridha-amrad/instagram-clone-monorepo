import ProfileFooter from "#/components/footers/profile-footer";
import { Sidebar } from "#/components/sidebar";
import ProfileInfo from "#/components/user-profile/profile-info";
import { ProfileTabs } from "#/components/user-profile/profile-tabs";
import { getSession } from "#/features/auth/api";
import ProfilePosts from "#/features/posts/profile/user-posts/component/profile-posts";
import { profilePostsQueryOptions } from "#/features/posts/profile/user-posts/query";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username")({
  head: () => ({
    meta: [{ title: "Instagram Clone - Home" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/auth/login" });
    }
    queryClient.setQueryData(["auth"], session);
    return { session: session };
  },
  loader: async ({ context: { queryClient }, params: { username } }) => {
    const profileData = await queryClient.ensureQueryData(
      userProfileQueryOptions(username),
    );
    if (!profileData) throw notFound();
    await queryClient.ensureQueryData(
      profilePostsQueryOptions(profileData.username, profileData.id),
    );
    return { profileData };
  },
  component: RouteComponent,
  notFoundComponent: () => <div>User not found</div>,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const { profileData } = Route.useLoaderData();

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <div className="flex-1 space-y-4 px-4">
        <ProfileInfo />
        <ProfileTabs />
        <ProfilePosts userId={profileData.id} username={profileData.username} />
        <ProfileFooter />
      </div>
    </div>
  );
}
