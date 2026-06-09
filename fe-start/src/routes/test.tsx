import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="bg-red-500 w-sm h-300"></div>
      <div className="bg-green-500 w-sm h-300"></div>
      <div className="bg-amber-500 w-sm h-300"></div>
    </div>
  );
}
