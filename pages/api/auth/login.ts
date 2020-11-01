import qs from "querystring";

import { NextApiHandler } from "next";

import { serverEnv } from "@/server/env";

const loginHandler: NextApiHandler = (req, res) => {
  const params = {
    client_id: serverEnv("AUTH_GOOGLE_CLIENT_ID"),
    redirect_uri: "http://localhost:3000/api/auth/callback",
    response_type: "code",
    scope:
      "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  };
  const url = `https://accounts.google.com/o/oauth2/auth?${qs.stringify(
    params
  )}`;

  res.redirect(302, url);
};

export default loginHandler;
