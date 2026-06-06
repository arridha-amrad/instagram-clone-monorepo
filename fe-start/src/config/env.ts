import { withRelatedProject } from "@vercel/related-projects";

const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (required && !value) {
    console.warn(`[Env Warning]: Environment variable ${key} is not set.`);
  }
  return value || "";
};

export const env = {
  VITE_SERVER_BASE_URL: getEnvVar("VITE_BACKEND_URL"),
  VITE_FRONTEND_URL: getEnvVar("VITE_FRONTEND_URL"),
  VITE_CLOUDINARY_FOLDER: getEnvVar("VITE_CLOUDINARY_FOLDER"),
} as const;

const vercelHost = withRelatedProject({
  projectName: "instagram-clone-monorepo-be",
  defaultHost: import.meta.env.VITE_BACKEND_URL as string,
});

export const serverHost = import.meta.env.DEV
  ? (import.meta.env.VITE_BACKEND_URL as string)
  : vercelHost;
