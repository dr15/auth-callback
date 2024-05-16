import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID ?? "",
    clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    allowDangerousEmailAccountLinking: true,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
];

const config = {
  providers,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return {
      id: providerData.id,
      name: providerData.name,
      type: providerData.type,
    };
  } else {
    return { id: provider.id, name: provider.name, type: provider.type };
  }
});

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(config);
