import { NextApiHandler } from "next";
import NextAuth, { InitOptions as NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

import { container } from "@/server/container";
import { serverEnv } from "@/server/env";
import { CreateAuthenticationToken } from "@/server/usecase/CreateAuthenticationToken";

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: serverEnv("AUTH_GOOGLE_CLIENT_ID"),
      clientSecret: serverEnv("AUTH_GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    session: async (session, user: any) => ({
      expires: session.expires,
      accountId: user.id,
    }),
    jwt: async (token, user, account) => {
      const isLoginRequest = !!account;

      if (isLoginRequest) {
        await container
          .build(CreateAuthenticationToken)
          .execute(account.id, account.accessToken);

        token.id = account.id;
      }

      return token;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
