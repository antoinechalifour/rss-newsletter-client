import qs from "querystring";

import axios from "axios";

import { serverEnv } from "@/server/env";

const clientId = serverEnv("AUTH_GOOGLE_CLIENT_ID");
const clientSecret = serverEnv("AUTH_GOOGLE_CLIENT_SECRET");
const redirectUri = `${serverEnv("AUTH_REDIRECT_URI")}/api/auth/callback`;
const scope =
  "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

const urls = {
  auth: "https://accounts.google.com/o/oauth2/auth",
  token: "https://oauth2.googleapis.com/token",
};

const postFormUrlEncoded = (url: string, body: any) =>
  axios
    .post(url, qs.stringify(body), {
      headers: {
        "Content-Type": "content-type: application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data.id_token);

export const Oauth = {
  authenticationUrl: () =>
    `${urls.auth}?${qs.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope,
    })}`,
  idToken: (code: string) =>
    postFormUrlEncoded(urls.token, {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      // TODO: scope ??
    }),
};
