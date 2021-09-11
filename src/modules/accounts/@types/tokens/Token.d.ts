export type Token = string;

export type TokenPayload = {
  sub: string;
  admin: boolean;
  iat: number;
  exp: number;
};

export type TokenResponse = {
  id: Uuid;
  admin: boolean;
};