import { cn } from "#/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "@tanstack/react-router";
import { BookmarkIcon, Grid, SquareUser, Video } from "lucide-react";

export function ProfileTabs() {
  const { username } = useParams({ from: "/u/$username" });

  const navigate = useNavigate();
  const links = [
    {
      title: "Posts",
      value: "",
      icon: Grid,
    },
    {
      title: "Reels",
      value: "reels",
      icon: Video,
    },
    {
      title: "Saved",
      value: "saved",
      icon: BookmarkIcon,
    },
    {
      title: "Tagged",
      value: "tagged",
      icon: SquareUser,
    },
  ];
  return (
    <Tabs
      onValueChange={(e) => {
        navigate({
          to: `/u/$username/${e}`,
          params: { username },
        });
      }}
      defaultValue={""}
    >
      <TabsList>
        {links.map((item) => (
          <TabsTrigger value={item.value} key={item.title}>
            <item.icon />
            <span className={cn("")}>{item.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
