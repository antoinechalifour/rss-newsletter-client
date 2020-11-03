import { Redis } from "ioredis";

import { AuthenticationPort } from "@/server/AuthenticationPort";
import { AuthenticationError } from "@/server/models/AuthenticationError";
import { AuthenticationToken } from "@/server/models/AuthenticationToken";

interface Dependencies {
  redis: Redis;
}

export class AuthenticationAdapter implements AuthenticationPort {
  private readonly redis;

  constructor({ redis }: Dependencies) {
    this.redis = redis;
  }

  save(authenticationToken: AuthenticationToken) {
    return this.redis.set(
      authenticationToken.sessionId,
      JSON.stringify(authenticationToken)
    );
  }

  async ofAccountId(accountId: string): Promise<AuthenticationToken> {
    const serializedAuthenticationToken = await this.redis.get(accountId);

    if (!serializedAuthenticationToken)
      throw new AuthenticationError(
        `No authentication token for acccount ${accountId}`
      );

    return JSON.parse(serializedAuthenticationToken);
  }
}
