import { v4 as uuid } from "uuid";

export interface AuthenticationToken {
  sessionId: string;
  idToken: string;
}

export const createAuthenticationToken = (
  idToken: string
): AuthenticationToken => ({
  sessionId: uuid(),
  idToken,
});
