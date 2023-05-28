import type { EmailType } from '@management:models/email-type';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type Email = {
  address: string;
  type: string;
  userId: Uuid;

  verified: boolean;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emailType?: EmailType;
  user?: Manager;
}
