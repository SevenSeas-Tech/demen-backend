
import type { HashProvider } from '@management:provider-types/hash';

import { BcryptHashProvider } from '@management:providers/hash/bcrypt';

// * ---------------------------------------------------------------------- * //

class ManagementProviderInjection {
  static hashProvider: HashProvider = new BcryptHashProvider();
}

// * ---------------------------------------------------------------------- * //

export { ManagementProviderInjection };
