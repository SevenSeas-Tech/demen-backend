
import { PrismaEmailTypesRepository } from '@management:database/prisma/repositories/email-types';
import { PrismaEmailsRepository } from '@management:database/prisma/repositories/emails';
import { PrismaManagersRepository } from '@management:database/prisma/repositories/managers';
import {
  EmailTypesTestRepository
} from '@management:database/test/repositories/email-types-test-repository';
import {
  EmailsTestRepository
} from '@management:database/test/repositories/emails-test-repository';
import {
  ManagersTestRepository
} from '@management:database/test/repositories/managers-test-repository';
import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol,
  TestEmailTypesRepositorySymbol,
  TestEmailsRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';

import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';
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
