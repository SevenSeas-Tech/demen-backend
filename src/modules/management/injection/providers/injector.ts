import type { HashProvider } from '@management:provider-types/hash';

import { HashProviderSymbol } from '@management:injection/providers/symbols';
import { BcryptHashProvider } from '@management:providers/hash/bcrypt';

// * ---------------------------------------------------------------------- * //

class ManagementProviderInjector {
  readonly [HashProviderSymbol]: HashProvider = new BcryptHashProvider();
}

// * ---------------------------------------------------------------------- * //

export { ManagementProviderInjector };
