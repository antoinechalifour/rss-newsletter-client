import { NextApiHandler } from "next";
import NextAuth, { InitOptions as NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

import { serverEnv } from "@/server/env";

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: serverEnv("AUTH_GOOGLE_CLIENT_ID"),
      clientSecret: serverEnv("AUTH_GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      console.group("Callback/session");
      console.log("Session:", session);
      console.log("User:", user);
      console.groupEnd();

      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      console.group("Callback/JWT");
      console.log("Token:", token);
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      console.log("isNewUser:", isNewUser);
      console.groupEnd();
      return token;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
