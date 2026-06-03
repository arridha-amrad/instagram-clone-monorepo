const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    console.warn(`[Env Warning]: Environment variable ${key} is not set.`);
  }
  return value || "";
};

export const env = {
  BACKEND_URL: getEnvVar("BACKEND_URL"),
  CLOUDINARY_SECRET: getEnvVar("CLOUDINARY_SECRET"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  FRONTEND_URL: getEnvVar("FRONTEND_URL"),
  GITHUB_CLIENT_ID: getEnvVar("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnvVar("GITHUB_CLIENT_SECRET"),
  DATABASE_URL_DIRECT: getEnvVar("DATABASE_URL_DIRECT"),
  DATABASE_URL_ACC: getEnvVar("DATABASE_URL_ACC"),
  GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),
  PORT: getEnvVar("PORT"),
} as const;
