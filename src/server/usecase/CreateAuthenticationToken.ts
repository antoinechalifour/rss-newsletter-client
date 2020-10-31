import { AuthenticationPort } from "@/server/AuthenticationPort";

interface Dependencies {
  authenticationPort: AuthenticationPort;
}

export class CreateAuthenticationToken {
  private authenticationPort;

  constructor({ authenticationPort }: Dependencies) {
    this.authenticationPort = authenticationPort;
  }

  async execute(accountId: string, accessToken: string) {
    await this.authenticationPort.save({
      accountId,
      accessToken,
    });
  }
}
