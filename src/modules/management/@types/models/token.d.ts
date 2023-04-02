import type { Manager } from './manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Token {
  id: Uuid;
  typeId: Uuid;
  userId: Uuid;

  validUntil: Date;
  isExpired: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface TokenFullData extends Token {
  tokenType: TokenType;
  user: Manager;
}

// * ---------------------------------------------------------------------- * //

export interface TokenType {
  id: Uuid;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface TypeWithTokens extends TokenType {
  tokens: Token[];
}