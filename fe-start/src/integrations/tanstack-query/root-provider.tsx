import { QueryClient } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 100,
      },
    },
  });

  return {
    queryClient,
  };
}
export default function TanstackQueryProvider() {}
