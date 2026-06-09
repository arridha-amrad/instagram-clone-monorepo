import Avatar from "#/components/avatar";
import { AvatarGroup } from "#/components/ui/avatar";
import { useMemo } from "react";
import type { TDetailPost } from "../api";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Props = {
  post: TDetailPost;
};

export default function Header({ post }: Props) {
  const images = useMemo(() => {
    return [
      post.user.image ?? "/default.jpg",
      ...post.collaborators.map((c) => c.user.image ?? "/default.jpg"),
    ];
  }, [post.id]);

  const usernames = useMemo(() => {
    return [
      post.user.username,
      ...(post.collaborators?.map((c) => c.user.username) ?? []),
    ];
  }, [post.id, post.collaborators]);

  console.log(usernames);

  return (
    <div className="flex items-start w-full gap-x-4 p-4">
      {/* Avatar */}
      <AvatarGroup>
        {images.map((url) => (
          <Avatar key={url} src={url} />
        ))}
      </AvatarGroup>
      {/* username */}
      <div className="flex-1">
        <FormattedUserLinks usernames={usernames} />
      </div>
      {/* more options */}
      <Button size={"icon-sm"} variant={"secondary"}>
        <MoreHorizontal />
      </Button>
    </div>
  );
}

function FormattedUserLinks({ usernames }: { usernames: string[] }) {
  console.log("here username : ", usernames);

  if (!usernames || usernames.length === 0) return null;

  // Kondisi 1: Hanya 1 username
  if (usernames.length === 1) {
    return (
      <Link
        to="/u/$username"
        className="font-semibold text-sm"
        params={{ username: usernames[0] }}
      >
        {usernames[0]}
      </Link>
    );
  }

  // Kondisi 2: Ada 2 username (u1 and u2)
  if (usernames.length === 2) {
    return (
      <>
        {/* <Link  to={`/${usernames[0]}`}>{usernames[0]}</Link> */}
        <Link
          to="/u/$username"
          className="font-semibold text-sm"
          params={{ username: usernames[0] }}
        >
          {usernames[0]}
        </Link>
        {" and "}
        <Link
          to="/u/$username"
          className="font-semibold text-sm"
          params={{ username: usernames[1] }}
        >
          {usernames[1]}
        </Link>
      </>
    );
  }

  // Kondisi 3: 3 sampai n username (u1, u2, ..., and un)
  return (
    <>
      {usernames.map((username, index) => {
        const isLast = index === usernames.length - 1;
        const isSecondLast = index === usernames.length - 2;

        return (
          <span key={username}>
            <Link
              to="/u/$username"
              className="font-semibold text-sm"
              params={{ username }}
            >
              {username}
            </Link>
            {/* Aturan Tanda Baca */}
            {!isLast && !isSecondLast && ", "}
            {isSecondLast && ", and "}
          </span>
        );
      })}
    </>
  );
}
