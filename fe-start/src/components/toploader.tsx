import { useRouter } from "@tanstack/react-router";
import NProgress from "nprogress";
import { useEffect } from "react";

// Import CSS bawaan nprogress
import "nprogress/nprogress.css";

// Kustomisasi konfigurasi nprogress
NProgress.configure({ showSpinner: false, speed: 400 });

export function TopLoader() {
  const router = useRouter();

  useEffect(() => {
    // 1. Jalankan NProgress saat router bersiap memuat data rute baru
    const unsubBeforeLoad = router.subscribe("onBeforeLoad", (event) => {
      // event.hrefChanged bernilai true jika pathname, search params, atau hash berubah.
      // Jika user klik link menuju halaman + params yang persis sama, nilainya false.
      if (event.hrefChanged) {
        NProgress.start();
      }
    });

    // 2. Hentikan NProgress saat navigasi dan render rute baru selesai sepenuhnya
    const unsubRendered = router.subscribe("onRendered", () => {
      NProgress.done();
    });

    return () => {
      unsubBeforeLoad();
      unsubRendered();
    };
  }, [router]);

  return null;
}
