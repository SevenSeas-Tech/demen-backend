import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Phone {
  id: Uuid;
  userId: Uuid;
  internationalCode: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  user?: Manager;
}
