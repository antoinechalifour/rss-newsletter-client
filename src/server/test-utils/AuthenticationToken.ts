import { AuthenticationToken } from "@/server/models/AuthenticationToken";

export const anAuthenticationToken = (
  overrides: Partial<AuthenticationToken> = {}
): AuthenticationToken => ({
  idToken: "id-token-1",
  sessionId: "session-1",
  ...overrides,
});
