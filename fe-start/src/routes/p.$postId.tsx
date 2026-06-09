import { Sidebar } from "#/components/sidebar";
import { authQueryOptions } from "#/features/auth/query";
import PostDetailCarousel from "#/features/posts/detail/components/carousel";
import PostDetailHeader from "#/features/posts/detail/components/header";
import { postDetailQueryOptions } from "#/features/posts/detail/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMeasure } from "@uidotdev/usehooks";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/p/$postId")({
  head: () => ({
    meta: [{ title: "Instagram Clone" }],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(authQueryOptions());
    return {
      session,
    };
  },
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(postDetailQueryOptions(postId));
  },
  notFoundComponent: () => <p>post not found</p>,
  errorComponent: () => <div>something went wrong</div>,
  pendingComponent: () => <Loader2 className="animate-spin size-4" />,
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(postDetailQueryOptions(postId));
  const [ref, { height }] = useMeasure();
  return (
    <div
      id="parent"
      className="mx-auto flex min-h-svh w-full max-w-[1200px] gap-x-4 border border-yellow-500"
    >
      {session && <Sidebar />}
      {/* 1. Bungkus dengan items-start agar baris ini tidak dipaksa setinggi layar */}
      <div className="flex-1 p-4 flex items-start max-w-[1000px] mx-auto">
        {/* 2. SUB-WRAPPER: Berikan w-full dan flex. Secara default h-auto (mengikuti anak tertinggi) */}
        <div className="flex w-full">
          {/* 3. Kotak Merah: Mengontrol lebar (grow) dan tinggi lewat aspect-ratio */}
          <div
            ref={ref}
            style={{
              aspectRatio: data.aspectRatio === "RATIO_1_1" ? "1 / 1" : "4 / 5",
            }}
            className="grow min-w-0 overflow-hidden"
          >
            <PostDetailCarousel />
          </div>
          {/* 4. Kotak Hijau: w-[350px] konstan, dan tingginya otomatis mengikuti tinggi sub-wrapper (tinggi si merah) */}
          <div
            style={{ height: height ?? 0 }}
            className="w-[450px] shrink-0 bg-muted flex flex-col"
          >
            <PostDetailHeader post={data} />
            <div className="flex-1 bg-pink-500"></div>
            <div className="h-[100px] w-full bg-amber-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
