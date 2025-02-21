import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface JWTDecoded {
  sub: number;
  username: string;
  firstName: string;
  lastName: string;
  organization: string | null;
  iat: number;
  exp: number;
}

function isTokenExpired(exp: number): boolean {
  const currentTime = Date.now();
  const expirationTime = exp * 1000;

  return currentTime >= expirationTime;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: token.refreshToken }),
  });

  if (res.status === 400) {
    throw new Error("Refresh token is invalid");
  }

  const response = await res.json();

  return {
    ...token,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing email or password in credentials.");
            return null;
          }
          const { email, password } = credentials;

          console.log("Attempting to log in user:", { email });

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
              credentials: "include",
            },
          );

          if (!res.ok) {
            const errorDetails = await res.text(); // Capture server's error response
            console.error(
              `Login failed with status ${res.status}:`,
              errorDetails,
            );
            return null;
          }

          const user = await res.json();
          console.log("Login successful for user:", { email, user });
          return user;
        } catch (error) {
          console.error("An error occurred during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const decodedToken = jwtDecode<JWTDecoded>(user.accessToken);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          decoded: decodedToken,
        };
      }

      if (!isTokenExpired(token?.decoded?.exp!)) return token;
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.decoded?.sub!,
          email: token.decoded?.username!,
          firstName: token.decoded?.firstName!,
          lastName: token.decoded?.lastName!,
          organization: token.decoded?.organization || null,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
};
