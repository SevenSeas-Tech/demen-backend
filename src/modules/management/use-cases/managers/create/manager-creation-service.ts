import { EmailInUseError } from '@management:errors/email-in-use';
import { EmailTypeNotFoundError } from '@management:errors/email-type-not-found';
import { PasswordDoesNotMatchError } from '@management:errors/password-match';
import { ManagerToResponseMapper } from '@management:mapper/manager-map';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { ManagerResponseData } from '@management:dto/manager/manager-response';
import type { HashProviderInterface } from '@management:provider-types/hash';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagerCreationService {
  private readonly managersRepository: ManagersRepositoryInterface;
  private readonly emailsRepository: EmailsRepositoryInterface;
  private readonly emailTypesRepository: EmailTypesRepositoryInterface;
  private readonly hashProvider: HashProviderInterface;

  constructor(
    managersRepository: ManagersRepositoryInterface,
    emailsRepository: EmailsRepositoryInterface,
    emailTypesRepository: EmailTypesRepositoryInterface,
    hashProvider: HashProviderInterface
  ) {
    this.managersRepository = managersRepository;
    this.emailsRepository = emailsRepository;
    this.emailTypesRepository = emailTypesRepository;
    this.hashProvider = hashProvider;
  }

  async execute( data: ManagerCreationData): Promise<ManagerResponseData> {
    const { password, passwordConfirmation } = data;

    //todo: data validation;

    this.passwordsMatchOrThrow(password, passwordConfirmation);

    await this.emailIsAvailableOrThrow(data.emailAddress);

    await this.emailTypeExistsOrThrow(data.emailType);

    const passwordHash = await this.hashProvider.hash(password);

    const manager = await this.managersRepository.create({
      ...data,
      password: passwordHash
    });

    const managerWithoutPassword = ManagerToResponseMapper
      .removePassword(manager);

    return managerWithoutPassword;
  }

  // ------------------------------------------------------------------------ //

  private async emailIsAvailableOrThrow(emailAddress: string): Promise<boolean> {
    const email = await this.emailsRepository.findByEmail(emailAddress);

    if (email) throw new EmailInUseError();

    return true;
  }

  // ------------------------------------------------------------------------ //

  private async emailTypeExistsOrThrow(emailType: string): Promise<boolean> {
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
