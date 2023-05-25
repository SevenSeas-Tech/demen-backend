import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type EmailCreationData = {
  userId: Uuid;
  type: string;
  address: string;
}

// * ---------------------------------------------------------------------- * //
