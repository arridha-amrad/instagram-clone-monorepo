import {
  BriefcaseBusiness,
  Calendar,
  Link,
  MapPin,
  SettingsIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import EditProfile from "./edit-profile";
import { LogoutDialog } from "../dialogs/logout-dialog";
import type { TFetchProfile } from "#/features/users/fetch-profile/api";
import MutualFollowers from "./mutual-followers";
import { formatJoinedDate } from "#/lib/utils";
import { UserProfileFollowButton } from "#/features/users/follow-user/follow-user-button";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";

const username = "arridha08";

type Props = {
  profile: TFetchProfile;
};

export default function ProfileInfo({ profile }: Props) {
  const { data: authUser } = useQuery(authQueryOptions());
  return (
    <div className="w-full py-4">
      <div className="flex h-full w-full flex-col">
        <div className="h-30 w-full">
          <img
            className="h-full w-full object-cover object-bottom"
            src="https://images.unsplash.com/photo-1769540209843-c1e6a462b9d3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="background wallpaper"
          />
        </div>

        <div className="relative flex h-14 w-full bg-background">
          <div className="absolute bottom-4 left-4">
            <Avatar className="size-32 ring-2 ring-background ring-offset-2 ring-offset-background">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full items-center justify-end gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SettingsIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <EditProfile />
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
              <h3>Pekanbaru, Riau</h3>
            </div>
          )}
          {/* OCCUPATION */}
          {profile?.userProfile?.occupation && (
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <BriefcaseBusiness className="size-4" />
              <h3>Software Engineer</h3>
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
