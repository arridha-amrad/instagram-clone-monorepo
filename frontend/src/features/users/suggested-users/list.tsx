import HomeFooter from "#/components/footers/home-footer";
import { useQuery } from "@tanstack/react-query";
import type { TSuggestedUsers } from "./api";
import { suggestedUsersQueryOptions } from "./query";
import SuggestedUser from "./suggested-user";

type Props = {
  users: TSuggestedUsers[];
};

export default function SuggestedUsers({ users }: Props) {
  const { data: suggestedUsers } = useQuery({
    ...suggestedUsersQueryOptions(),
    initialData: users,
  });

  return (
    <div className="w-full space-y-6">
      <div className="px-1">
        <h5 className="text-sm font-semibold text-muted-foreground">
          Suggested users
        </h5>
      </div>
      <div className="space-y-2">
        {suggestedUsers?.map((user) => (
          <SuggestedUser
            key={user.id}
            isFollow={user?.isFollow}
            image={user.image ?? ""}
            name={user.name}
            userId={user.id}
            username={user.username}
          />
        ))}
      </div>
      <HomeFooter />
    </div>
  );
}
