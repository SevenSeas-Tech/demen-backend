import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface EmailCreationData {
  userId: Uuid;
  typeId: string;
  email: string;
}
