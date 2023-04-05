import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Email {
  id: Uuid;
  typeId: string;
  userId: Uuid;

  email: string;
  verified: boolean;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emailType?: EmailType;
  user?: Manager;
}

// * ---------------------------------------------------------------------- * //

export interface EmailType {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emails?: Email[];
}
