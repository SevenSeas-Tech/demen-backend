import { Email, Uuid } from '@accounts:types/users/User';

export type AdminUserResponseDto = {
  id: Uuid;
  admin: boolean;
  username: string;
  email: Email;
  name: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};
