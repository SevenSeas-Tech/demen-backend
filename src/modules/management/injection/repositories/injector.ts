import { PrismaEmailTypesRepository } from '@management:database/prisma/repositories/email-types';
import { PrismaEmailsRepository } from '@management:database/prisma/repositories/emails';
import { PrismaManagersRepository } from '@management:database/prisma/repositories/managers';
import { ManagersTestRepository } from '@management:database/test/repositories/managers';
import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';

import type { EmailTypesRepository } from '@management:repositories/email-types';
import type { EmailsRepositoryInterface } from '@management:repositories/emails';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagementRepositoriesContainer {
  readonly [ManagersRepositorySymbol]: ManagersRepositoryInterface =
    new PrismaManagersRepository();

  readonly [TestManagersRepositorySymbol]: ManagersRepositoryInterface =
    new ManagersTestRepository();

  readonly [EmailsRepositorySymbol]: EmailsRepositoryInterface =
    new PrismaEmailsRepository();

  readonly [EmailTypesRepositorySymbol]: EmailTypesRepository =
    new PrismaEmailTypesRepository();
}

// * ---------------------------------------------------------------------- * //

export { ManagementRepositoriesContainer };
