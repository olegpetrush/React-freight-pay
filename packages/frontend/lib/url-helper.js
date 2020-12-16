import { APP_URL } from "./config";

export default function createLoginUrl(redirectTo) {
  if (redirectTo) {
    return `${APP_URL}/api/login?redirectTo=${encodeURIComponent(redirectTo)}`;
  }
  return `${APP_URL}/api/login`;
}
