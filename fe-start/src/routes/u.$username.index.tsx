import ProfilePosts from "#/features/posts/profile/user-posts/component/profile-posts";
import { profilePostsQueryOptions } from "#/features/posts/profile/user-posts/query";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username/")({
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
});

function RouteComponent() {
  const { profileData } = Route.useLoaderData();

  return (
    <ProfilePosts userId={profileData.id} username={profileData.username} />
  );
}
