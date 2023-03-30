import { Uuid } from '@shared/@types/Uuid';

export type Email = string;

export type Credentials = {
  id: Uuid;
  username: string;
  email: Email;
  password: string;
  name: string;
  lastName: string;
};
