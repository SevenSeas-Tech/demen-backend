import type { EmailType } from '@management:models/email-type';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type Email = {
  id: Uuid;
  type: string;
  userId: Uuid;

  address: string;
  verified: boolean;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emailType?: EmailType;
  user?: Manager;
}
