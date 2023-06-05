/* eslint-disable @typescript-eslint/no-empty-function */
import { EmailTypeNotFoundError } from '@management:errors/email-type-not-found';
import { PasswordDoesNotMatchError } from '@management:errors/password-match';
import { TestHashProviderSymbol, TestManagementValidationProviderSymbol } from '@management:injection/providers/symbols';
import {
  TestEmailTypesRepositorySymbol,
  TestEmailsRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';
import { InvalidDataError } from '@shared/errors/invalid-data';
import { DependencyInjection } from '@shared/injection';

import { ManagerCreationService } from '../manager-creation-service';

import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { DataValidationProviderInterface } from '@management:provider-types/data-validation';
import type { HashProviderInterface } from '@management:provider-types/hash';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types-repository';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';

// * ---------------------------------------------------------------------- * //

describe('Manager Creation Service Tests', () => {
  const { container } = DependencyInjection;

  // *** --- data ------------------------------------------------------- *** //
  const emailTypeData: EmailTypeCreationData = { type: 'personal' };

  const validManagerData: ManagerCreationData = {
    name: 'john',
    surname: 'doe',
    emailAddress: 'johndoe@example.com',
    emailType: emailTypeData.type,
    password: '@Password',
    passwordConfirmation: '@Password'
  };

  // *** --- injection -------------------------------------------------- *** //
  let service: ManagerCreationService;
  let managersRepository: ManagersRepositoryInterface;
  let emailsRepository: EmailsRepositoryInterface;
  let emailTypesRepository: EmailTypesRepositoryInterface;
  let hashProvider: HashProviderInterface;
  let validationProvider: DataValidationProviderInterface;

  beforeEach(() => {
    managersRepository = container[TestManagersRepositorySymbol];
    emailsRepository = container[TestEmailsRepositorySymbol];
    emailTypesRepository = container[TestEmailTypesRepositorySymbol];
    hashProvider = container[TestHashProviderSymbol];
    validationProvider = container[TestManagementValidationProviderSymbol];

    void emailTypesRepository.create(emailTypeData);

    service = new ManagerCreationService(
      managersRepository,
      emailsRepository,
      emailTypesRepository,
      hashProvider,
      validationProvider
    );
  });

  // *** --- success ---------------------------------------------------- *** //

  it('Should create a manager', async () => {
    const manager = await service.execute(validManagerData);

    expect(manager).toHaveProperty('name');
    expect(manager).toHaveProperty('surname');
    expect(manager).toHaveProperty('isActive');
    expect(manager).toHaveProperty('createdAt');
    expect(manager).toHaveProperty('createdAt');
    expect(manager).toHaveProperty('updatedAt');
  });

  // ------------------------------------------------------------------------ //

  it('Should hash the password', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');

    await service.execute(validManagerData);

    expect(hash).toHaveBeenCalled();
  });

  // ------------------------------------------------------------------------ //

  it('Should not return the password', async () => {
    const manager = await service.execute(validManagerData);

    expect(manager).not.toHaveProperty('password');
  });

  // *** --- password --------------------------------------------------- *** //

  it('Should throw if passwords does not match', () => {
    const data: ManagerCreationData = {
      ...validManagerData,
      password: '@Password2'
    };

    void expect(async () => {
      await service.execute(data);
    })
      .rejects
      .toEqual(new PasswordDoesNotMatchError());
  });

  // ------------------------------------------------------------------------ //

  it('Should return error if password length < 8', async () => {
    const data: ManagerCreationData = {
      ...validManagerData,
      password: '@Passwo',
      passwordConfirmation: '@Passwo'
    };

    const result = await service.execute(data);

    expect(result).toBeInstanceOf(InvalidDataError);
  });

  // ------------------------------------------------------------------------ //

  it('Should return error if password length > 20', () => {});

  // ------------------------------------------------------------------------ //

  it('Should return error if password has sequence >= 3 ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should return error if password has no number ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should return error if password has no upper ', () => {});

  // *** --- e-mail ----------------------------------------------------- *** //

  it('Should return error if e-mail is not valid ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if e-mail is in use', () => {});

  // *** --- names ------------------------------------------------------ *** //

  it('Should capitalize the name and surname', () => {});

  // ------------------------------------------------------------------------ //

  it('Should trim name and surname', () => {});

  // ------------------------------------------------------------------------ //

  it('Should return error if name length < 3', () => {});

  // ------------------------------------------------------------------------ //

  it('Should return error if surname length < 3', () => {});

  // *** --- e-mail type ------------------------------------------------ *** //

  it('Should throw if email type does not exist', () => {
    const data: ManagerCreationData = { ...validManagerData, emailType: 'invalid' };

    void expect(async () => {
      await service.execute(data);
    })
      .rejects
      .toEqual(new EmailTypeNotFoundError());
  });
});

// * ---------------------------------------------------------------------- * //

/*
  ? --- tests not implemented here, but in integration -------------------- ? //

  ? --- it('Should create an e-mail', () => {}); -------------------------- ? //
*/
