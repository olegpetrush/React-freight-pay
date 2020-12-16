import { ENVS } from "../../utils/constants";

const nonProdRoutes =
  process.env.NODE_ENV !== ENVS.PRODUCTION ? ["destroyUser"] : [];

export const publicRoutes: string[] = [
  "__schema",
  "createPhoneVerification",
  "verifyCodeVerification",
  "requestResetPassword",
  "send",
  "resetPassword",
  "verifyEmail",
  "doesEmailExist",
  ...nonProdRoutes,
];
