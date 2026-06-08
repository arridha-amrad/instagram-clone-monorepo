import { QueryClient } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 menit
        refetchOnWindowFocus: false, // Matikan refetch saat pindah fokus jendela
        refetchOnReconnect: false, // Matikan refetch saat koneksi kembali
      },
    },
  });

  return {
    queryClient,
  };
}
export default function TanstackQueryProvider() {}
