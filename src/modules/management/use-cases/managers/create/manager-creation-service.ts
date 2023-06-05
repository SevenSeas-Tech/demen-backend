import { ManagerToResponseMapper } from '@management:mapper/manager-map';
import { AppError } from '@shared/errors/app-error';

import { passwordsMatchOrThrow } from '../throwers/password-match';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { ManagerResponseData } from '@management:dto/manager/manager-response';
import type { DataValidationProviderInterface } from '@management:provider-types/data-validation';
import type { HashProviderInterface } from '@management:provider-types/hash';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types-repository';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

class ManagerCreationService {
  private readonly managersRepository: ManagersRepositoryInterface;
  private readonly emailsRepository: EmailsRepositoryInterface;
  private readonly emailTypesRepository: EmailTypesRepositoryInterface;
  private readonly hashProvider: HashProviderInterface;
  private readonly validationProvider: DataValidationProviderInterface;

  // ------------------------------------------------------------------------ //

  constructor(
    managersRepository: ManagersRepositoryInterface,
    emailsRepository: EmailsRepositoryInterface,
    emailTypesRepository: EmailTypesRepositoryInterface,
    hashProvider: HashProviderInterface,
    validationProvider: DataValidationProviderInterface
  ) {
    this.managersRepository = managersRepository;
    this.emailsRepository = emailsRepository;
    this.emailTypesRepository = emailTypesRepository;
    this.hashProvider = hashProvider;
    this.validationProvider = validationProvider;
  }

  // ------------------------------------------------------------------------ //

  async execute(data: ManagerCreationData): Promise<ManagerResponseData | AppError> {
    // *** --- validation ----------------------------------------------- *** //
    const result = this.validationProvider.validateManagerCreationData(data);

    if (result instanceof AppError) return result;

    const { emailAddress, emailType, password, passwordConfirmation } = result;

    // *** --- business logic ------------------------------------------- *** //
    passwordsMatchOrThrow(password, passwordConfirmation);

    await this.emailsRepository.emailIsAvailableOrThrow(emailAddress);

    await this.emailTypesRepository.emailTypeExistsOrThrow(emailType);

    const passwordHash = await this.hashProvider.hash(password);

    // *** --- persistency ---------------------------------------------- *** //
    const manager = await this.managersRepository.create({
      ...data,
      password: passwordHash
    });

    // *** --- response ------------------------------------------------- *** //
    const managerWithoutPassword = ManagerToResponseMapper
      .removePassword(manager);

    return managerWithoutPassword;
  }
}

// * ---------------------------------------------------------------------- * //

export { ManagerCreationService };
