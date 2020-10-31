import { asClass, asValue, createContainer } from "awilix";
import Redis from "ioredis";

import { serverEnv } from "@/server/env";
import { AuthenticationAdapter } from "@/server/infrastructure/AuthenticationAdapter";

export const container = createContainer().register({
  // Infrastructure
  redis: asValue(new Redis(serverEnv("REDIS_URL"))),
  authenticationPort: asClass(AuthenticationAdapter),
});
