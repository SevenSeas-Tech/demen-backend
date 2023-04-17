import type { UuidProviderType } from '@shared/@types/providers/uuid';

import { UuidProvider } from '@shared/providers/uuid';

// * ---------------------------------------------------------------------- * //

class SharedProviderInjection {
  static uuidProvider: UuidProviderType = new UuidProvider();
}

// * ---------------------------------------------------------------------- * //

export { SharedProviderInjection };
