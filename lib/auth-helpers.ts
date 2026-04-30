import "@/lib/amplify";
import { fetchAuthSession } from "aws-amplify/auth";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  emailVerified?: boolean;
};

export type CognitoIdTokenClaims = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  "cognito:username"?: string;
};

export function mapCognitoClaimsToAuthUser(
  claims: CognitoIdTokenClaims,
): AuthUser {
  return {
    id: claims.sub,
    email: claims.email ?? "",
    name: claims.name ?? claims["cognito:username"] ?? "User",
    picture: claims.picture,
    emailVerified: claims.email_verified,
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await fetchAuthSession();
    const claims = session.tokens?.idToken?.payload;

    if (!claims?.sub) {
      return null;
    }

    return mapCognitoClaimsToAuthUser(claims as CognitoIdTokenClaims);
  } catch {
    return null;
  }
}
