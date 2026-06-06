import Avatar from "#/components/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#/components/ui/item";
import { authQueryOptions } from "#/features/auth/query";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { TSearchUser } from "../api";
import { useAddToSearchHistoryMutation } from "../mutation";

type Props = {
  user: TSearchUser;
  setOpen: (open: boolean) => void;
};

export default function UserSearchItem({ user, setOpen }: Props) {
  const { mutate } = useAddToSearchHistoryMutation();
  const { data } = useQuery(authQueryOptions());

  const handleLinkClick = async () => {
    if (!data) return;
    if (user.id === data.user.id) return;
    mutate(user.id);
    setOpen(false);
  };

  return (
    <Item size="xs" className="w-full" asChild>
      <Link
        onClick={handleLinkClick}
        to="/u/$username"
        params={{ username: user.username }}
      >
        <ItemMedia>
          <Avatar src={user.image} />
        </ItemMedia>
        <ItemContent className="">
          <ItemTitle>{user.username}</ItemTitle>
          <ItemDescription className="leading-none">
            {user.name}
          </ItemDescription>
        </ItemContent>
        {/* <ItemActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert("follow");
            }}
            size={"xs"}
          >
            Follow
          </Button>
        </ItemActions> */}
      </Link>
    </Item>
  );
}
