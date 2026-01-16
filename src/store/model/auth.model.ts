export interface AuthClaims {
  at_hash: string;
  sub: string;
  email_verified: boolean;
  iss: string;
  typ: string;
  preferred_username: string;
  given_name: string;
  nonce: string;
  sid: string;
  aud: string[];
  acr: string;
  realm_access: {
    roles: string[];
  };
  azp: string;
  auth_time: string;
  name: string;
  exp: string;
  family_name: string;
  iat: string;
  email: string;
  jti: string;
}

export interface SessionResponse {
  authenticated: boolean;
  username: string;
  authorities: string[];
  email: string;
  emailVerified: boolean;
  preferredUsername: string;
  givenName: string;
  familyName: string;
  locale: string | null;
  claims: AuthClaims;
}
