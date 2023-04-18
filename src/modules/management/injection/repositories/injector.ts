import type { EmailsRepository } from '@management:repositories/emails';
import type { EmailTypesRepository } from '@management:repositories/email-types';
import type { ManagersRepository } from '@management:repositories/managers';

import { PrismaEmailsRepository } from '@management:database/prisma/repositories/emails';
import { PrismaEmailTypesRepository } from '@management:database/prisma/repositories/email-types';
import { PrismaManagersRepository } from '@management:database/prisma/repositories/managers';
import { TestManagersRepository } from '@management:database/test/repositories/managers';
import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';

// * ---------------------------------------------------------------------- * //

class ManagementRepositoriesInjector {
  readonly [ManagersRepositorySymbol]: ManagersRepository =
    new PrismaManagersRepository();

  readonly [TestManagersRepositorySymbol]: ManagersRepository =
    new TestManagersRepository();

  readonly [EmailsRepositorySymbol]: EmailsRepository =
    new PrismaEmailsRepository();

  readonly [EmailTypesRepositorySymbol]: EmailTypesRepository =
    new PrismaEmailTypesRepository();
}

// * ---------------------------------------------------------------------- * //

export { ManagementRepositoriesInjector };
