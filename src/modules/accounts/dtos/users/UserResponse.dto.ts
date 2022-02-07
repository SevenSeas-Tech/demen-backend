import { Email } from '@accounts:types/users/User';
import { Uuid } from '@shared/@types/Uuid';

export type UserResponseDto = {
  id: Uuid;
  email: Email;
  name: string;
  avatar: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};
