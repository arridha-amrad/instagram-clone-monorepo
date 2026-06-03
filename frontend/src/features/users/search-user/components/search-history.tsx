import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserRoundSearch } from "lucide-react";
import { useDeleteAllFromSearchHistoriesMutation } from "../mutation";
import { useFetchHistoriesQuery } from "../query";
import UserSearchItem from "./user-search-item";

export default function SearchHistory() {
  const { mutate } = useDeleteAllFromSearchHistoriesMutation();
  const { data } = useFetchHistoriesQuery();
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-xs font-bold text-muted-foreground">Recent</h1>
        <button
          onClick={() => mutate()}
          type="button"
          className="text-xs font-bold text-destructive"
        >
          Clear all
        </button>
      </div>

      {!data || data.length === 0 ? (
        <EmptyMuted />
      ) : (
        <div className="flex flex-col gap-y-2 h-[250px] overflow-y-scroll">
          {data?.map((user) => (
            <UserSearchItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyMuted() {
  return (
    <Empty className="h-full bg-muted/30 h-[250px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserRoundSearch />
        </EmptyMedia>
        <EmptyTitle>No Search Histories</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Your search histories record is currently empty
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
