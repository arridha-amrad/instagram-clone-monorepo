import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const { data } = await axios.get(
      "https://instagram-clone-monorepo.vercel.app/test-prisma",
    );
    console.log({ data });
  },
});

function RouteComponent() {
  return <div>Hello "/test"!</div>;
}
