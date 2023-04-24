import type { Email } from '@management:models/email';

// * ---------------------------------------------------------------------- * //

export type EmailType = {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emails?: Email[];
}
