import type { Manager } from './manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Email {
  id: Uuid;
  typeId: Uuid;
  userId: Uuid;

  email: string;
  verified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface EmailWithUser extends Email {
  emailType: EmailType;
  user: Manager;
}

// * ---------------------------------------------------------------------- * //

export interface EmailType {
  id: Uuid;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface EmailTypeWithEmails extends EmailType {
  emails: Email[];
}
