import type { Issue } from '@management:models/issue';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Student {
  id: Uuid;

  name: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  issues?: Issue[];
}
