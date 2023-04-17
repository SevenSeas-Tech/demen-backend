import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface UuidProviderType {
  generateV4(): Uuid;
}
