import { IncomingMessage } from "http";

import { AwilixContainer } from "awilix";
import axios from "axios";
import { NextApiRequest } from "next";
import { parseCookies } from "nookies";

import { AuthenticationToken } from "@/server/AuthenticationToken";

export const buildAxiosInstance = (
  container: AwilixContainer,
  authenticationToken: AuthenticationToken
) =>
  axios.create({
    baseURL: container.resolve("apiUrl"),
    headers: {
      Authorization: `Bearer ${authenticationToken.idToken}`,
    },
  });

export const getSessionId = (
  ctx: { req: NextApiRequest } | { req: IncomingMessage }
): string | null => parseCookies(ctx).session ?? null;
