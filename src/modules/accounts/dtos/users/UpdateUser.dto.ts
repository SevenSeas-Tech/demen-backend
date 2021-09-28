import { Uuid } from '@accounts:types/users/User';

export type UpdateUserDto = {
  id: Uuid;
  name: string;
  lastName: string;
};
