const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (required && !value) {
    console.warn(`[Env Warning]: Environment variable ${key} is not set.`);
  }
  return value || "";
};

export const env = {
  VITE_SERVER_BASE_URL: getEnvVar("VITE_SERVER_BASE_URL"),
} as const;
