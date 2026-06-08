import { cn } from "#/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { BookmarkIcon, Grid, SquareUser, Video } from "lucide-react";

export function ProfileTabs() {
  const { username } = useParams({ from: "/u/$username" });
  const location = useLocation();
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

  const currentPathSegments = location.pathname.split("/");
  const currentTab = currentPathSegments[3] || "";

  return (
    <Tabs
      onValueChange={(e) => {
        navigate({
          to: `/u/$username/${e}`,
          params: { username },
        });
      }}
      value={currentTab}
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
