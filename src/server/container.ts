import { asClass, asValue, createContainer } from "awilix";
import Redis from "ioredis";

import { serverEnv } from "@/server/env";
import { AccountAdapter } from "@/server/infrastructure/AccountAdapter";
import { AuthenticationAdapter } from "@/server/infrastructure/AuthenticationAdapter";
import { NewsletterConfigurationAdapter } from "@/server/infrastructure/NewsletterConfigurationAdapter";

export const container = createContainer().register({
  // Infrastructure
  apiUrl: asValue(serverEnv("API_URL")),
  redis: asValue(new Redis(serverEnv("REDIS_URL"))),
  accountPort: asClass(AccountAdapter),
  authenticationPort: asClass(AuthenticationAdapter),
  newsletterConfigurationPort: asClass(NewsletterConfigurationAdapter),
});
