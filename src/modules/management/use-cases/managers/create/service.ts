import { EmailInUseError } from '@management:errors/email-in-use';

import type { ManagerCreationData } from '@management:dto/manager/create';
import type { Manager } from '@management:models/manager';
import type { EmailsRepositoryInterface } from '@management:repositories/emails';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagerCreationService {
  private readonly managersRepository: ManagersRepositoryInterface;
  private readonly emailsRepository: EmailsRepositoryInterface;

  constructor(
    managersRepository: ManagersRepositoryInterface,
    emailsRepository: EmailsRepositoryInterface
  ) {
    this.managersRepository = managersRepository;
    this.emailsRepository = emailsRepository;
  }

  async execute( data: ManagerCreationData): Promise<Manager> {
    //todo: data validation;

    const emailInUse = await this.emailsRepository.findByEmail(data.email);

    if (emailInUse) throw new EmailInUseError();

    const manager = await this.managersRepository.create(data);

    // todo remove password;

    return manager;
  }
}

// * ---------------------------------------------------------------------- * //

export { ManagerCreationService };
