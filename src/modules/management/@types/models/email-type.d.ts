import type { Email } from '@management:models/email';

// * ---------------------------------------------------------------------- * //

export interface EmailType {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emails?: Email[];
}
