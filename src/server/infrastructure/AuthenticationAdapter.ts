import { Redis } from "ioredis";

import { AuthenticationError } from "@/server/AuthenticationError";
import { AuthenticationPort } from "@/server/AuthenticationPort";
import { AuthenticationToken } from "@/server/AuthenticationToken";

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
      authenticationToken.accountId,
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
