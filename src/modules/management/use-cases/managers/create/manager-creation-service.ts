import { EmailInUseError } from '@management:errors/email-in-use';
import { EmailTypeNotFoundError } from '@management:errors/email-type-not-found';
import { PasswordDoesNotMatchError } from '@management:errors/password-match';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { Manager } from '@management:models/manager';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagerCreationService {
  private readonly managersRepository: ManagersRepositoryInterface;
  private readonly emailsRepository: EmailsRepositoryInterface;
  private readonly emailTypesRepository: EmailTypesRepositoryInterface;

  constructor(
    managersRepository: ManagersRepositoryInterface,
    emailsRepository: EmailsRepositoryInterface,
    emailTypesRepository: EmailTypesRepositoryInterface
  ) {
    this.managersRepository = managersRepository;
    this.emailsRepository = emailsRepository;
    this.emailTypesRepository = emailTypesRepository;
  }

  async execute( data: ManagerCreationData): Promise<Manager> {
    const { password, passwordConfirmation } = data;

    //todo: data validation;

    this.passwordsMatchOrThrow(password, passwordConfirmation);

    await this.emailAvailableOrThrow(data.emailAddress);

    await this.emailTypeExistOrThrow(data.emailType);

    const manager = await this.managersRepository.create(data);

    // todo: remove password;

    return manager;
  }

  // ------------------------------------------------------------------------ //

  private async emailAvailableOrThrow(emailAddress: string): Promise<boolean> {
    const email = await this.emailsRepository.findByEmail(emailAddress);

    if (email) throw new EmailInUseError();

    return true;
  }

  // ------------------------------------------------------------------------ //

  private async emailTypeExistOrThrow(emailType: string): Promise<boolean> {
    const type = await this.emailTypesRepository.findByType(emailType);

    if (!type) throw new EmailTypeNotFoundError();

    return true;
  }

  // ------------------------------------------------------------------------ //

  private passwordsMatchOrThrow(password: string, password2: string): void {
    if (!(password === password2)) throw new PasswordDoesNotMatchError();
  }
}

// * ---------------------------------------------------------------------- * //

export { ManagerCreationService };
