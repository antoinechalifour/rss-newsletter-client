import assert from "assert";

export type EnvironmentVariableName =
  | "AUTH_GOOGLE_CLIENT_ID"
  | "AUTH_GOOGLE_CLIENT_SECRET"
  | "REDIS_URL"
  | "API_URL";

export const serverEnv = (key: EnvironmentVariableName) => {
  const variable = process.env[key];

  assert(variable, `Environment variable ${key} is required`);

  return variable;
};
