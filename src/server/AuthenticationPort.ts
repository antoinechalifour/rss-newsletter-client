import { AuthenticationToken } from "@/server/models/AuthenticationToken";

export interface AuthenticationPort {
  ofAccountId(accountId: string): Promise<AuthenticationToken>;
  save(authenticationToken: AuthenticationToken): Promise<unknown>;
}
