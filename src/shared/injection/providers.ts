import { UuidProvider } from '@shared/providers/uuid';
import { UuidProviderSymbol } from '@shared:injection/symbols';

import type { UuidProviderInterface } from '@shared/@types/providers/uuid';

// * ---------------------------------------------------------------------- * //

class SharedProviderInjector {
  readonly [UuidProviderSymbol]: UuidProviderInterface = new UuidProvider();
}

// * ---------------------------------------------------------------------- * //

export { SharedProviderInjector };
