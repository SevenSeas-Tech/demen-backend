import { Uuid } from '@shared/@types/Uuid';

export type UpdateStaffMemberDto = {
  id: Uuid;
  name: string;
  lastName: string;
};
