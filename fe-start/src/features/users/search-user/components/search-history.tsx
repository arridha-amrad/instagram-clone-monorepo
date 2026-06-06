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

type Props = {
  setOpen: (open: boolean) => void;
};

export default function SearchHistory({ setOpen }: Props) {
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
        <div className="flex flex-col gap-y-2 h-[250px] overflow-y-auto custom-scrollbar">
          {data?.map((user) => (
            <UserSearchItem key={user.id} user={user} setOpen={setOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyMuted() {
  return (
    <Empty className="bg-muted/30 h-[250px]">
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
