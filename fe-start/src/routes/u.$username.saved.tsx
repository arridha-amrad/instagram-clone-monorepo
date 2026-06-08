import ProfileBookmarkedPosts from "#/features/posts/profile/user-bookmarked-posts/profile-bookmarked-posts";
import { profileBookmarkedPostsQueryOptions } from "#/features/posts/profile/user-bookmarked-posts/query";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username/saved")({
  loader: async ({ context: { queryClient }, params: { username } }) => {
    const profileData = await queryClient.ensureQueryData(
      userProfileQueryOptions(username),
    );
    if (!profileData) throw notFound();
    await queryClient.ensureQueryData(
      profileBookmarkedPostsQueryOptions(profileData.username, profileData.id),
    );
    return { profileData };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    profileData: { id, username },
  } = Route.useLoaderData();

  return <ProfileBookmarkedPosts userId={id} username={username} />;
}
