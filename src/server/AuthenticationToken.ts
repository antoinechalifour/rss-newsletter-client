import { v4 as uuid } from "uuid";

export interface AuthenticationToken {
  accountId: string;
  idToken: string;
}

export const createAuthenticationToken = (
  idToken: string
): AuthenticationToken => ({
  accountId: uuid(),
  idToken,
});
