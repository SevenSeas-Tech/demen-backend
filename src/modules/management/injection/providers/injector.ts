import {
  ManagementValidationProviderSymbol,
  HashProviderSymbol,
  TestHashProviderSymbol,
  TestManagementValidationProviderSymbol
} from '@management:injection/providers/symbols';
import { ZodValidationProvider } from '@management:providers/data-validation/zod';
import { BcryptHashProvider } from '@management:providers/hash/bcrypt';
import { TestHashProvider } from '@management:providers/hash/test';

import type { DataValidationProviderInterface } from '@management:provider-types/data-validation';
import type { HashProviderInterface } from '@management:provider-types/hash';

// * ---------------------------------------------------------------------- * //

class ManagementProviderContainer {
  readonly [HashProviderSymbol]: HashProviderInterface = new BcryptHashProvider();
  readonly [TestHashProviderSymbol]: HashProviderInterface = new TestHashProvider();

  readonly [ManagementValidationProviderSymbol]: DataValidationProviderInterface =
    new ZodValidationProvider();

  readonly [TestManagementValidationProviderSymbol]: DataValidationProviderInterface =
    new ZodValidationProvider();
}

// * ---------------------------------------------------------------------- * //

export { ManagementProviderContainer };
