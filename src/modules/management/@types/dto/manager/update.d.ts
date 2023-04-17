import type { Uuid } from '@types';
// * ---------------------------------------------------------------------- * //

export interface ManagerUpdateData {
  id: Uuid;
  name?: string;
  lastName?: string;
  password?: string;
}
