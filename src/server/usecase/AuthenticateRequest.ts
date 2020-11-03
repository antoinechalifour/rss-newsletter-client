import { AuthenticationPort } from "@/server/AuthenticationPort";
import { AuthenticationError } from "@/server/models/AuthenticationError";

interface Dependencies {
  authenticationPort: AuthenticationPort;
}

export class AuthenticateRequest {
  private authenticationPort;

  constructor({ authenticationPort }: Dependencies) {
    this.authenticationPort = authenticationPort;
  }

  execute(sessionId: string | null) {
    if (!sessionId) throw new AuthenticationError("User is not logged in");

    return this.authenticationPort.ofAccountId(sessionId);
  }
}
