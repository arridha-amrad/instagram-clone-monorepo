import { privateAxios } from "#/lib/axios";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { cache } from "react";

export const getCurrSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const headersPlainObject = Object.fromEntries(headers.entries());
    const { data } = await privateAxios("/auth/get-session", {
      withCredentials: true,
      headers: {
        ...headersPlainObject,
      },
    });
    return data as TSession;
  },
);

export const getSession = cache(getCurrSession);

export type TSession = {
  user: User;
  session: Session;
} | null;

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  username: string;
  displayUsername: string;
  createdAt: string; // Bisa diubah ke Date jika di-parse terlebih dahulu
  updatedAt: string; // Bisa diubah ke Date jika di-parse terlebih dahulu
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  ipAddress: string; // Tetap string meskipun nilainya kosong ""
  userAgent: string;
  expiresAt: string; // Bisa diubah ke Date jika di-parse terlebih dahulu
  createdAt: string; // Bisa diubah ke Date jika di-parse terlebih dahulu
  updatedAt: string; // Bisa diubah ke Date jika di-parse terlebih dahulu
}
