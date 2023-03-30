import type { Email } from './email';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

// -------------------------------------------------------------------------- //

export interface Manager {
  id: Uuid;
  name: string;
  lastName: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  emails: Email[];
}

// -------------------------------------------------------------------------- //

// export type Credentials = {
//   id: Uuid;
//   username: string;
//   email: string;
//   password: string;
//   name: string;
//   lastName: string;
// };
