import { AuthenticationPort } from "@/server/AuthenticationPort";
import { createAuthenticationToken } from "@/server/models/AuthenticationToken";
import { Oauth } from "@/server/oauth";

interface Dependencies {
  authenticationPort: AuthenticationPort;
}

export class OauthCallback {
  private authenticationPort;

  constructor({ authenticationPort }: Dependencies) {
    this.authenticationPort = authenticationPort;
  }

  async execute(code: string) {
    const idToken = await Oauth.idToken(code);
    const authenticationToken = createAuthenticationToken(idToken);

    this.authenticationPort.save(authenticationToken);

    return authenticationToken;
  }
}
