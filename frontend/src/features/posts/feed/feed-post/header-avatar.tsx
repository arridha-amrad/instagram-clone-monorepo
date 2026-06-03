import Avatar from "#/components/avatar";
import { AvatarGroup } from "#/components/ui/avatar";
import { memo } from "react";

const AvatarHeader = memo(({ images }: { images: string[] }) => {
  return (
    <AvatarGroup>
      {images.map((url) => (
        <Avatar key={url} src={url} />
      ))}
    </AvatarGroup>
  );
});

export default AvatarHeader;
