import {
  HashProviderSymbol,
  TestHashProviderSymbol
} from '@management:injection/providers/symbols';
import { BcryptHashProvider } from '@management:providers/hash/bcrypt';
import { TestHashProvider } from '@management:providers/hash/test';

import type { HashProviderInterface } from '@management:provider-types/hash';

// * ---------------------------------------------------------------------- * //

class ManagementProviderContainer {
  readonly [HashProviderSymbol]: HashProviderInterface = new BcryptHashProvider();
  readonly [TestHashProviderSymbol]: HashProviderInterface = new TestHashProvider();
}

// * ---------------------------------------------------------------------- * //

export { ManagementProviderContainer };
