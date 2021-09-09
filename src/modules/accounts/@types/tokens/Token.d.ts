export type Token = string;

export type TokenPayload = {
  sub: string;
  admin: boolean;
  iat: number;
  exp: number;
};

export type TokenResponse = Pick<TokenPayload, 'sub' | 'admin'>;
