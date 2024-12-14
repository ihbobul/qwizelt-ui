/* eslint-disable no-restricted-exports */
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/question-factory", "/questions", "/profile", "/dashboard"],
};
