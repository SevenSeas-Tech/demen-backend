import { Email } from '@accounts:types/User';

export type CreateUserDto = {
  username: string;
  email: Email;
  name: string;
  lastName: string;
  password: string;
};
