import { Uuid } from '@shared/@types/Uuid';

export type UpdateUserDto = {
  id: Uuid;
  name: string;
  lastName: string;
};
