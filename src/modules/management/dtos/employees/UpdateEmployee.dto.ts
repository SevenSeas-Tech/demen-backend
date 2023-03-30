import { Uuid } from '@shared/@types/Uuid';

export type UpdateEmployeeDto = {
  id: Uuid;
  name: string;
  lastName: string;
};
