/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
