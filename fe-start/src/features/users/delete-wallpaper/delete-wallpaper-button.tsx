import { Button } from "#/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useDeleteWallpaperMutation } from "./mutation";
import toast from "react-hot-toast";

export default function DeleteWallpaperButton() {
  const { mutateAsync, isPending } = useDeleteWallpaperMutation();
  return (
    <Button
      title="remove wallpaper"
      onClick={async () => {
        try {
          mutateAsync();
          toast.success("wallpaper deleted");
        } catch (err) {
          console.log(err);
          toast.error("something went wrong");
        }
      }}
      size={"icon"}
      variant={"destructive"}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <Trash />}
    </Button>
  );
}
