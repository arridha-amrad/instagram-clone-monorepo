import Avatar from "#/components/avatar";
import { Button } from "#/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#/components/ui/item";
import { Link } from "@tanstack/react-router";
import type { TSearchUser } from "../api";
import { useAddToSearchHistoryMutation } from "../mutation";
import { useQuery } from "@tanstack/react-query";
import { authQueryOptions } from "#/features/auth/query";

type Props = {
  user: TSearchUser;
};

export default function UserSearchItem({ user }: Props) {
  const { mutate } = useAddToSearchHistoryMutation();
  const { data } = useQuery(authQueryOptions());

  const handleLinkClick = () => {
    if (!data?.data) return;
    if (user.id === data.data.user.id) return;
    mutate(user.id);
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
