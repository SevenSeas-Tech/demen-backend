import { PrismaEmailTypesRepository } from '@management:database/prisma/repositories/prisma-email-types-repository';
import { PrismaEmailsRepository } from '@management:database/prisma/repositories/prisma-emails-repository';
import { PrismaManagersRepository } from '@management:database/prisma/repositories/prisma-managers-repository';
import { EmailTypesTestRepository } from '@management:database/test/repositories/email-types-test-repository';
import { EmailsTestRepository } from '@management:database/test/repositories/emails-test-repository';
import { ManagersTestRepository } from '@management:database/test/repositories/managers-test-repository';
import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol,
  TestEmailTypesRepositorySymbol,
  TestEmailsRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';

import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types-repository';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagementRepositoriesContainer {
  readonly [ManagersRepositorySymbol]: ManagersRepositoryInterface =
    new PrismaManagersRepository();

  readonly [TestManagersRepositorySymbol]: ManagersRepositoryInterface =
    new ManagersTestRepository();

  readonly [EmailsRepositorySymbol]: EmailsRepositoryInterface =
    new PrismaEmailsRepository();

  readonly [TestEmailsRepositorySymbol]: EmailsRepositoryInterface =
    new EmailsTestRepository();

  readonly [EmailTypesRepositorySymbol]: EmailTypesRepositoryInterface =
    new PrismaEmailTypesRepository();

  readonly [TestEmailTypesRepositorySymbol]: EmailTypesRepositoryInterface =
    new EmailTypesTestRepository();
}

// * ---------------------------------------------------------------------- * //

export { ManagementRepositoriesContainer };
