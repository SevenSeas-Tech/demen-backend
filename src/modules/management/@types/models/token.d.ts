import type { Manager } from '@management:models/manager';
import type { TokenType } from '@management:models/token-type';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type Token = {
  id: Uuid;
  typeId: string;
  userId: Uuid;

  validUntil: Date;
  isExpired: boolean;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  tokenType?: TokenType;
  user?: Manager;
}
