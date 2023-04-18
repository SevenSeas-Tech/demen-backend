import type { UuidProviderType } from '@shared/@types/providers/uuid';

import { UuidProviderSymbol } from '@shared:injection/symbols';
import { UuidProvider } from '@shared/providers/uuid';

// * ---------------------------------------------------------------------- * //

class SharedProviderInjector {
  readonly [UuidProviderSymbol]: UuidProviderType = new UuidProvider();
}

// * ---------------------------------------------------------------------- * //

export { SharedProviderInjector };
