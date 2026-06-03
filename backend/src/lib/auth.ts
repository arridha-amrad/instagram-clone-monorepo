import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { username } from "better-auth/plugins";
import { env } from "../config/env.js";
import { sendEmail } from "./mailer.js";

export const auth = betterAuth({
  baseURL: env.BACKEND_URL,
  trustedOrigins: [env.FRONTEND_URL],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1 hour,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 3,
  },
  emailVerification: {
    expiresIn: 3600*2,
    sendOnSignUp: true,
		autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
			sendEmail({
        html: `<p>Please click this link to verify your account : ${url}</p>`,
        subject: "Email verification",
        to: user.email
      })
		},
  },
  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      enabled: true,
      prompt: "select_account",
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.username) {
            const baseUsername = user.email.split("@")[0];
            const randomSuffix = Math.floor(Math.random() * 1000);
            return {
              data: {
                ...user,
                username: `${baseUsername}${randomSuffix}`,
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [username()],
});
