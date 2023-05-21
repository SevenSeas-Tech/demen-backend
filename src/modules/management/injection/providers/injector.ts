import { HashProviderSymbol } from '@management:injection/providers/symbols';
import { BcryptHashProvider } from '@management:providers/hash/bcrypt';

import type { HashProvider } from '@management:provider-types/hash';

// * ---------------------------------------------------------------------- * //

class ManagementProviderContainer {
  readonly [HashProviderSymbol]: HashProvider = new BcryptHashProvider();
}

// * ---------------------------------------------------------------------- * //

export { ManagementProviderContainer };
