import { Sidebar } from "#/components/sidebar";
import ProfileEmptyPosts from "#/components/user-profile/profile-empty-posts";
import ProfileInfo from "#/components/user-profile/profile-info";
import { ProfileTabs } from "#/components/user-profile/profile-tabs";
import { authClient } from "#/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username")({
  head: () => ({
    meta: [{ title: "Instagram Clone - Home" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: "/auth/login" });
    }
    queryClient.setQueryData(["auth"], session);
    return { session: session.data };
  },
  component: RouteComponent,
  notFoundComponent() {
    return <div>User not found</div>;
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-300 gap-x-4">
      {session && <Sidebar />}
      <div className="flex-1 space-y-4 px-4">
        <ProfileInfo />
        <ProfileTabs />
        <div className="flex-1">
          <ProfileEmptyPosts title="Share Photos" />
          <div className="mt-4 grid grid-cols-4 gap-0.5">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="aspect-4/5 bg-muted"></div>
            ))}
          </div>
        </div>
        <footer className="container mx-auto space-y-4 p-4 pb-10 text-xs text-muted-foreground">
          <div className="">
            <ul className="flex justify-center gap-x-4">
              <li>Meta</li>
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Help</li>
              <li>API</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Locations</li>
              <li>Instagram Lite</li>
              <li>Meta AI</li>
              <li>Threads</li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <div>
              &copy; {new Date().getFullYear()} Startgram from arridha amrad
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
