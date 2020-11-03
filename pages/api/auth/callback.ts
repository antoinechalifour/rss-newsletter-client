import { NextApiHandler } from "next";
import { setCookie } from "nookies";

import { container } from "@/server/container";
import { OauthCallback } from "@/server/usecase/OauthCallback";

const callbackHandler: NextApiHandler = async (req, res) => {
  const authenticationToken = await container
    .build(OauthCallback)
    .execute(req.query.code as string);

  setCookie({ res }, "session", authenticationToken.accountId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600,
    path: "/",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.redirect("/");
};

export default callbackHandler;
