import ProfileFooter from "#/components/footers/profile-footer";
import { Sidebar } from "#/components/sidebar";
import ProfileInfo from "#/components/user-profile/profile-info";
import { ProfileTabs } from "#/components/user-profile/profile-tabs";
import { getSession } from "#/features/auth/api";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import {
  createFileRoute,
  notFound,
  Outlet,
  redirect,
} from "@tanstack/react-router";

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
  component: RouteComponent,
  notFoundComponent: () => <div>User not found</div>,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <div className="flex-1 space-y-4 px-4">
        <ProfileInfo />
        <ProfileTabs />
        <Outlet />
        <ProfileFooter />
      </div>
    </div>
  );
}
