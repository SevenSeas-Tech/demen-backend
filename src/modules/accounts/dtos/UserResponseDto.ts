import { Email, Uuid } from '@accounts:types/users/User';

export type UserResponseDto = {
  id: Uuid;
  username: string;
  email: Email;
  name: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};
