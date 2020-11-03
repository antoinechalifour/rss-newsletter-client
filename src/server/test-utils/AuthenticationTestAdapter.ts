import { AuthenticationPort } from "@/server/AuthenticationPort";

export const anAuthenticationPort = (): AuthenticationPort => ({
  ofAccountId: jest.fn(),
  save: jest.fn(),
});
