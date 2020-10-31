import { AuthenticationToken } from "@/server/AuthenticationToken";

export interface AuthenticationPort {
  ofAccountId(accountId: string): Promise<AuthenticationToken>;
  save(authenticationToken: AuthenticationToken): Promise<unknown>;
}
