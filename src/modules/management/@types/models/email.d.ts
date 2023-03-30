import type { Manager } from './manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Email {
  id: Uuid;
  userId: Uuid;
  typeId: Uuid;
  email: string;
  verified: boolean;

  createdAt: Date;
  updatedAt: Date;

  emailType: EmailType;
  user: Manager;
}

// -------------------------------------------------------------------------- //

export interface EmailType {
  id: Uuid;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  emails: Email[];
}
