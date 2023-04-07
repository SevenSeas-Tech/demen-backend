import type { Token } from '@management:models/token';

// * ---------------------------------------------------------------------- * //

export interface TokenType {
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  tokens?: Token[];
}
