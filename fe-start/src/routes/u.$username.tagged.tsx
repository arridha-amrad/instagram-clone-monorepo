import ProfileTaggedPosts from "#/features/posts/profile/profile-tagged-posts/profile-tagged-posts";
import { profileTaggedPostsQueryOptions } from "#/features/posts/profile/profile-tagged-posts/query";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username/tagged")({
  loader: async ({ context: { queryClient }, params: { username } }) => {
    const profileData = await queryClient.ensureQueryData(
      userProfileQueryOptions(username),
    );
    if (!profileData) throw notFound();
    await queryClient.ensureQueryData(
      profileTaggedPostsQueryOptions(profileData.username, profileData.id),
    );
    return { profileData };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    profileData: { id, username },
  } = Route.useLoaderData();
  return <ProfileTaggedPosts userId={id} username={username} />;
}
