import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface UuidProviderInterface {
  generateV4(): Uuid;
}
