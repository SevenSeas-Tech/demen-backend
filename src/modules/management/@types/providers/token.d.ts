import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface TokenProviderInterface {
  sign(data: TokenData, type: string): SessionToken;
  verify(token: SessionToken, type: string): TokenData;
}

// -------------------------------------------------------------------------- //

export type SessionToken = string;

// -------------------------------------------------------------------------- //

export type TokenData = {
  id: Uuid;
  email: string;
};
