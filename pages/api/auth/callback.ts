import qs from "querystring";

import axios from "axios";
import { NextApiHandler } from "next";

import { serverEnv } from "@/server/env";

const callbackHandler: NextApiHandler = async (req, res) => {
  const params = {
    code: req.query.code,
    client_id: serverEnv("AUTH_GOOGLE_CLIENT_ID"),
    client_secret: serverEnv("AUTH_GOOGLE_CLIENT_SECRET"),
    redirect_uri: "http://localhost:3000/api/auth/callback",
    grant_type: "authorization_code",
    // scope: req.query.scope
  };

  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify(params),
      {
        headers: {
          "Content-Type": "content-type: application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
  res.end("done");
};

export default callbackHandler;
