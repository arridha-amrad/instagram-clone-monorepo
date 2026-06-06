import { authQueryOptions } from "#/features/auth/query";
import type { TFetchProfile } from "#/features/users/fetch-profile/api";
import { userProfileQueryOptions } from "#/features/users/fetch-profile/query";
import { UserProfileFollowButton } from "#/features/users/follow-user/follow-user-button";
import { formatJoinedDate } from "#/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  Calendar,
  Link,
  MapPin,
  SettingsIcon,
} from "lucide-react";
import { LogoutDialog } from "../dialogs/logout-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EditProfile from "./edit-profile";
import MutualFollowers from "./mutual-followers";
import ProfileAvatar from "./profile-avatar";
import BackgroundWallpaper from "./background-wallpaper";

export default function ProfileInfo() {
  const { username } = useParams({ from: "/u/$username" });
  const { data: profile } = useQuery(userProfileQueryOptions(username));
  const { data: authUser } = useQuery(authQueryOptions());
  return (
    <div className="w-full py-4">
      <div className="flex h-full w-full flex-col">
        <BackgroundWallpaper
          backgroundImage={profile?.userProfile?.bgWallpaper ?? undefined}
        />

        <div className="relative flex h-14 w-full bg-background">
          <ProfileAvatar image={profile?.image ?? null} />

          <div className="flex w-full items-center justify-end gap-x-2">
            {profile && <ProfileSettingsMenu profile={profile} />}
            <Button variant={"outline"}>Message</Button>
            <UserProfileFollowButton
              targetId={profile?.id ?? ""}
              isFollow={profile?.followers.some(
                ({ followerId }) => followerId === authUser?.user.id,
              )}
            />
          </div>
        </div>

        <div className="">
          <div>
            <h1 className="text-xl font-extrabold">{profile?.name}</h1>
            <h2 className="text-muted-foreground">@{profile?.username}</h2>
          </div>
          <p className="py-2 text-sm leading-relaxed font-light">
            {profile?.userProfile?.bio}
          </p>
        </div>

        <div className="mb-2 flex flex-wrap gap-x-4">
          {/* LOCATION */}
          {profile?.userProfile?.location && (
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              <h3>{profile.userProfile.location}</h3>
            </div>
          )}
          {/* OCCUPATION */}
          {profile?.userProfile?.occupation && (
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <BriefcaseBusiness className="size-4" />
              <h3>{profile.userProfile.occupation}</h3>
            </div>
          )}
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <h3>{formatJoinedDate(new Date(profile?.createdAt ?? ""))}</h3>
          </div>

          {/* WEB */}
          {profile?.userProfile?.web && (
            <div className="flex items-center gap-x-1 text-sm text-sky-500">
              <Link className="size-4" />
              <a>{profile.userProfile.web}</a>
            </div>
          )}
        </div>

        <div className="mb-2 flex gap-x-4 text-sm">
          {/* TOTAL POST */}
          <div className="space-x-1">
            <span className="font-semibold">
              {profile?._count.concretePosts}
            </span>
            <span className="font-light text-muted-foreground">posts</span>
          </div>
          {/* TOTAL FOLLOWERS */}
          <div className="space-x-1">
            <span className="font-semibold">{profile?._count.followers}</span>
            <span className="font-light text-muted-foreground">followers</span>
          </div>
          {/* TOTAL FOLLOWINGS */}
          <div className="space-x-1">
            <span className="font-semibold">{profile?._count.following}</span>
            <span className="font-light text-muted-foreground">followings</span>
          </div>
        </div>

        <MutualFollowers />
      </div>
    </div>
  );
}

const ProfileSettingsMenu = ({ profile }: { profile: TFetchProfile }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          {profile && <EditProfile profile={profile} />}
          <DropdownMenuItem>Edit Password</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutDialog>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              variant="destructive"
            >
              Logout
            </DropdownMenuItem>
          </LogoutDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
