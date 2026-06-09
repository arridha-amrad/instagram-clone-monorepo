import { createClientOnlyFn } from "@tanstack/react-start";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";

interface VolumeContextType {
  isMuted: boolean;
  volume: Array<number>;
  setGlobalMute: (muted: boolean) => void;
  setGlobalVolume: (val: Array<number>) => void;
}

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

// 1. Bungkus fungsi pembaca localStorage dengan createClientOnlyFn
const getStoredMute = createClientOnlyFn(() => {
  const saved = localStorage.getItem("isMuted");
  return saved ? JSON.parse(saved) : true;
});

const getStoredVolume = createClientOnlyFn(() => {
  const saved = localStorage.getItem("volume");
  return saved ? JSON.parse(saved) : [80];
});

export function VolumeProvider({ children }: { children: ReactNode }) {
  // 2. Gunakan langsung di dalam useState.
  // Di Server, nilainya otomatis fallback ke nilai default setelah tanda `??`
  const [isMuted, setIsMuted] = useState<boolean>(
    () => getStoredMute() ?? true,
  );
  const [volume, setVolume] = useState<Array<number>>(
    () => getStoredVolume() ?? [80],
  );

  const setGlobalMute = (muted: boolean) => {
    setIsMuted(muted);
    // Kita juga bisa bungkus ini, tapi karena fungsi ini hanya dipicu oleh interaksi user (klik tombol),
    // dipastikan ini hanya berjalan di client.
    localStorage.setItem("isMuted", JSON.stringify(muted));
  };

  const setGlobalVolume = (val: Array<number>) => {
    setVolume(val);
    localStorage.setItem("volume", JSON.stringify(val));
  };

  const contextValue = useMemo(
    () => ({
      isMuted,
      volume,
      setGlobalMute,
      setGlobalVolume,
    }),
    [isMuted, volume],
  );

  return (
    <VolumeContext.Provider value={contextValue}>
      {children}
    </VolumeContext.Provider>
  );
}

export const useVolume = () => {
  const context = useContext(VolumeContext);
  if (!context) throw new Error("useVolume must be used within VolumeProvider");
  return context;
};
