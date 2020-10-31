import { AwilixContainer } from "awilix";
import axios from "axios";

import { AuthenticationToken } from "@/server/AuthenticationToken";

export const buildAxiosInstance = (
  container: AwilixContainer,
  authenticationToken: AuthenticationToken
) =>
  axios.create({
    baseURL: container.resolve("apiUrl"),
    headers: {
      Authorization: `Bearer ${authenticationToken.accessToken}`,
    },
  });
