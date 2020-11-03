import { asValue, AwilixContainer } from "awilix";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { buildAxiosInstance, getSessionId } from "@/server/application/http";
import { AuthenticationError } from "@/server/AuthenticationError";
import { container } from "@/server/container";
import { AuthenticateRequest } from "@/server/usecase/AuthenticateRequest";

type AuthenticatedGetServerSideProps<Props> = (
  context: GetServerSidePropsContext,
  container: AwilixContainer
) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>;

export const authenticated = <Props>(
  callback: AuthenticatedGetServerSideProps<Props>
): GetServerSideProps => async (context) => {
  const sessionId = getSessionId(context);
  const scopedContainer = container.createScope();

  try {
    const authenticationToken = await scopedContainer
      .build(AuthenticateRequest)
      .execute(sessionId);

    scopedContainer.register({
      authenticationToken: asValue(authenticationToken),
      http: asValue(buildAxiosInstance(scopedContainer, authenticationToken)),
    });

    return callback(context, scopedContainer);
  } catch (e) {
    if (!(e instanceof AuthenticationError)) {
      throw e;
    }

    const { res } = context;
    res.statusCode = 302;
    res.setHeader("Location", "/api/auth/login");

    return { props: {} }; // Make TS happy :)
  }
};
