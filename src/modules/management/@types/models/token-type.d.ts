import type { Token } from '@management:models/token';

// * ---------------------------------------------------------------------- * //

export type TokenType = {
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  tokens?: Token[];
}
