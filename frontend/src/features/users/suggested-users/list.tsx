import Avatar from "#/components/avatar";
import HomeFooter from "#/components/footers/home-footer";
import { Button } from "#/components/ui/button";
import UsernameHoverCard from "#/components/username-hover-card";
import { useQuery } from "@tanstack/react-query";
import { suggestedUsersQueryOptions } from "./query";
import type { TSuggestedUsers } from "./api";

type Props = {
  users: TSuggestedUsers[]
}

export default function SuggestedUsers({users}: Props) {
  const { data: suggestedUsers } = useQuery({
    ...suggestedUsersQueryOptions(),
    initialData: users
  })

  return (
    <div className="w-full space-y-6">
      <div className="px-1">
        <h5 className="text-sm font-semibold text-muted-foreground">
          Suggested users
        </h5>
      </div>

      <div className="space-y-2">
        {suggestedUsers?.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 rounded-md px-1 py-1.5 text-left text-sm"
          >
            <Avatar src={user.image ?? ""} />
            <div className="grid flex-1 space-y-1 text-left text-sm">
              <UsernameHoverCard user={user} />
              <span className="truncate text-xs text-muted-foreground">
                Recommended for you
              </span>
            </div>
            <Button variant={"ghost"} className="text-primary" size={"xs"}>
              Follow
            </Button>
          </div>
        ))}
      </div>
      <HomeFooter />
    </div>
  );
}
