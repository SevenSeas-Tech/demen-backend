import type { Issue } from './issue';
import type { Phone } from './phone';
import type { Email } from './email';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Manager {
  id: Uuid;
  name: string;
  lastName: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface ManagerWithPhoneAndEmail extends Manager {
  emails: Email[];
  phones: Phone[];
}

// -------------------------------------------------------------------------- //

export interface ManagerFullData extends ManagerWithPhoneAndEmail {
  issues: Issue[];

  // todo: create and import models:
  tokens: Token[];
  videos: Video[];
}

