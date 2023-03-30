import { Email } from '@accounts:types/users/User';

export type CreateUserDto = {
  email: Email;
  name: string;
  lastName: string;
  avatar: string;
  googleId: string;
};
