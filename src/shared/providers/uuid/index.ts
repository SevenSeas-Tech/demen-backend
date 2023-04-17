import { v4 as uuidV4 } from 'uuid';

import type { UuidProviderType } from '@shared/@types/providers/uuid';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

class UuidProvider implements UuidProviderType {
  generateV4(): Uuid {
    return uuidV4() as Uuid;
  }
}

// * ---------------------------------------------------------------------- * //

export { UuidProvider };
