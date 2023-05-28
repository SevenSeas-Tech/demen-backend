import { v4 as uuidV4 } from 'uuid';

import type { UuidProviderInterface } from '@shared/@types/providers/uuid';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

class UuidProvider implements UuidProviderInterface {
  generateV4(): Uuid {
    return uuidV4();
  }
}

// * ---------------------------------------------------------------------- * //

export { UuidProvider };
