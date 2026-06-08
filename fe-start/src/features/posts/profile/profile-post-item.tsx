import { Copy, Heart, MessageCircle } from "lucide-react";
import type { TProfilePost } from "./user-posts/api";

type Props = {
  post: TProfilePost;
  username: string;
};

export default function ProfilePostItem({ post, username }: Props) {
  return (
    <div key={post.id} className="aspect-4/5 relative group">
      <img
        src={post.media[0].url}
        className="object-cover w-full h-full"
        alt={`${username}-profile-post`}
      />
      <div className="absolute inset-0 flex justify-center items-center bg-muted/70 opacity-0 group-hover:opacity-100">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-1">
            <Heart className="size-6 fill-foreground" />
            <span className="font-semibold">{post._count.postLikes}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <MessageCircle className="size-6 -scale-x-100 fill-foreground" />
            <span className="font-semibold">{post._count.comments}</span>
          </div>
        </div>
      </div>
      {post._count.media > 1 && (
        <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0">
          <Copy className="size-5" />
        </div>
      )}
    </div>
  );
}
