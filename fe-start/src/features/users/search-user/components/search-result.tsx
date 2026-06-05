import type { TSearchUser } from "../api";
import UserSearchItem from "./user-search-item";

type Props = {
  users: TSearchUser[];
};

export default function SearchResult({ users }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h1 className="text-xs font-medium text-muted-foreground">
          Search result
        </h1>
      </div>
      <div className="flex flex-col gap-y-2 h-[250px]">
        {users.map((user) => (
          <UserSearchItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
