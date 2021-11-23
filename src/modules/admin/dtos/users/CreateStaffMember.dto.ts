import { Email } from '@accounts:types/users/User';

export type CreateStaffMemberDto = {
  username: string;
  email: Email;
  name: string;
  lastName: string;
  password: string;
};
