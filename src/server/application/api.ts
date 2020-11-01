import { asValue, AwilixContainer } from "awilix";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { buildAxiosInstance } from "@/server/application/http";
import { AuthenticationError } from "@/server/AuthenticationError";
import { container } from "@/server/container";
import { AuthenticateRequest } from "@/server/usecase/AuthenticateRequest";

type AuthenticatedApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  container: AwilixContainer
) => void | Promise<void>;

export const authenticated = (
  callback: AuthenticatedApiHandler
): NextApiHandler => async (req, res) => {
  const session = await getSession({ req });
  const scopedContainer = container.createScope();

  try {
    const authenticationToken = await scopedContainer
      .build(AuthenticateRequest)
      .execute(session);

    scopedContainer.register({
      authenticationToken: asValue(authenticationToken),
      http: asValue(buildAxiosInstance(scopedContainer, authenticationToken)),
    });

    return callback(req, res, scopedContainer);
  } catch (e) {
    if (!(e instanceof AuthenticationError)) {
      throw e;
    }

    res.statusCode = 401;
    res.end();
  }
};
