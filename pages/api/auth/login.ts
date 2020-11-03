import { NextApiHandler } from "next";

import { Oauth } from "@/server/oauth";

const loginHandler: NextApiHandler = (req, res) => {
  res.redirect(302, Oauth.authenticationUrl());
};

export default loginHandler;
