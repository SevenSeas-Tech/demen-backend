import type { Manager } from '@management:models/manager';
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

  // *** --- relations -------------------------------------------------- *** //
  tokenType?: TokenType;
  user?: Manager;
}

// * ---------------------------------------------------------------------- * //

export interface TokenType {
  id: Uuid;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  tokens?: Token[];
}
