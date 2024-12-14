/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string; // Add this field for the JWT access token
    refreshToken: string; // Add this field for the JWT refresh token
  }

  interface Session {
    accessToken?: string; // Access token for session
    refreshToken?: string; // Refresh token for session
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      organization: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-shadow
  interface JWT {
    accessToken?: string; // Add the access token to the JWT object
    refreshToken?: string; // Add the refresh token to the JWT object
    decoded?: {
      sub: number;
      username: string;
      firstName: string;
      lastName: string;
      organization: string | null;
      iat: number;
      exp: number;
    };
  }
}
