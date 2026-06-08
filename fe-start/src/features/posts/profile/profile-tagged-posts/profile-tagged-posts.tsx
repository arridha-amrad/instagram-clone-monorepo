import ProfileEmptyPosts from "#/components/user-profile/profile-empty-posts";
import { useQuery } from "@tanstack/react-query";
import { profileTaggedPostsQueryOptions } from "./query";
import { Heart, MessageCircle } from "lucide-react";

type Props = {
  userId: string;
  username: string;
};

export default function ProfileTaggedPosts({ userId, username }: Props) {
  const { data } = useQuery(profileTaggedPostsQueryOptions(username, userId));

  if (!data || data.length === 0) {
    return <ProfileEmptyPosts title="Share Photos" />;
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-0.5">
      {data?.map((post) => (
        <div key={post.media.postId} className="aspect-4/5 relative group">
          <img
            src={post.media.url}
            className="object-cover w-full h-full"
            alt={`${username}-profile-post`}
          />
          <div className="absolute inset-0 flex justify-center items-center bg-muted/70 opacity-0 group-hover:opacity-100">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-1">
                <Heart className="size-6 fill-foreground" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <MessageCircle className="size-6 -scale-x-100 fill-foreground" />
                {/* <span className="font-semibold">{post._count.comments}</span> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
