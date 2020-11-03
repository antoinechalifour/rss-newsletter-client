import { asValue } from "awilix";
import { NextApiHandler } from "next";
import { setCookie } from "nookies";

import { buildAxiosInstance } from "@/server/application/http";
import { container } from "@/server/container";
import { CreateAccount } from "@/server/usecase/CreateAccount";
import { OauthCallback } from "@/server/usecase/OauthCallback";

const callbackHandler: NextApiHandler = async (req, res) => {
  const scopedContainer = container.createScope();

  const authenticationToken = await scopedContainer
    .build(OauthCallback)
    .execute(req.query.code as string);

  scopedContainer.register({
    http: asValue(buildAxiosInstance(scopedContainer, authenticationToken)),
  });

  await scopedContainer
    .build(CreateAccount)
    .execute(authenticationToken.idToken);

  setCookie({ res }, "session", authenticationToken.sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600,
    path: "/",
  });

  res.redirect("/");
};

export default callbackHandler;
