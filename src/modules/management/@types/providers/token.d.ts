import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface TokenProvider {
  sign(data: TokenData, type: string): SessionToken;
  verify(token: SessionToken, type: string): TokenData;
}

// -------------------------------------------------------------------------- //

export type SessionToken = string;

// -------------------------------------------------------------------------- //

export type TokenPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

// -------------------------------------------------------------------------- //

export type TokenData = {
  id: Uuid;
  email: string;
};

// -------------------------------------------------------------------------- //

export type MapElement = {
  secret: string;
  expiresIn: string;
}
