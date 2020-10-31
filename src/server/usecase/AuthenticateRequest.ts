import { AuthenticationError } from "@/server/AuthenticationError";
import { AuthenticationPort } from "@/server/AuthenticationPort";

interface Dependencies {
  authenticationPort: AuthenticationPort;
}

export class AuthenticateRequest {
  private authenticationPort;

  constructor({ authenticationPort }: Dependencies) {
    this.authenticationPort = authenticationPort;
  }

  execute(session: any | null) {
    if (!session) throw new AuthenticationError("User is not logged in");

    return this.authenticationPort.ofAccountId(session.accountId);
  }
}
