import { when } from "jest-when";

import { AuthenticationPort } from "@/server/AuthenticationPort";
import { AuthenticationError } from "@/server/models/AuthenticationError";
import { anAuthenticationPort } from "@/server/test-utils/AuthenticationTestAdapter";
import { anAuthenticationToken } from "@/server/test-utils/AuthenticationToken";
import { AuthenticateRequest } from "@/server/usecase/AuthenticateRequest";

describe("AuthenticateRequest", () => {
  let authenticateRequest: AuthenticateRequest;
  let authenticationPort: AuthenticationPort;

  beforeEach(() => {
    authenticationPort = anAuthenticationPort();
    authenticateRequest = new AuthenticateRequest({ authenticationPort });
  });

  it("throws an AuthenticationError when the session id is null", () => {
    // When
    expect(() => authenticateRequest.execute(null)).toThrow(
      new AuthenticationError("User is not logged in")
    );
  });

  it("returns the authentication token", async () => {
    // Given
    const sessionId = "session-1";

    when(authenticationPort.ofAccountId as jest.Mock)
      .calledWith(sessionId)
      .mockResolvedValue(anAuthenticationToken());

    // When
    const authenticationToken = await authenticateRequest.execute(sessionId);

    // Then
    expect(authenticationToken).toEqual(anAuthenticationToken());
  });
});
