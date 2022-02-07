import { Email } from '@accounts:types/users/User';
import { Uuid } from '@shared/@types/Uuid';

export type EmployeeResponseDto = {
  id: Uuid;
  username: string;
  email: Email;
  name: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};
