import type { Manager } from './manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Phone {
  id: Uuid;
  userId: Uuid;
  internationalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------------------- //

export interface PhoneWithUser extends Phone {
  user: Manager;
}
