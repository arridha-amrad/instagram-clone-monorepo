import ProfileEmptyPosts from "#/components/user-profile/profile-empty-posts";
import { useQuery } from "@tanstack/react-query";
import ProfilePostItem from "../profile-post-item";
import { profileBookmarkedPostsQueryOptions } from "./query";

type Props = {
  userId: string;
  username: string;
};

export default function ProfileBookmarkedPosts({ userId, username }: Props) {
  const { data } = useQuery(
    profileBookmarkedPostsQueryOptions(username, userId),
  );

  if (!data || data.length === 0) {
    return <ProfileEmptyPosts title="Share Photos" />;
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-0.5">
      {data?.map((post, i) => (
        <ProfilePostItem username={username} post={post} key={i} />
      ))}
    </div>
  );
}
