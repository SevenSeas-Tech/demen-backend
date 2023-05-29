/* eslint-disable @typescript-eslint/no-empty-function */
import { EmailTypeNotFoundError } from '@management:errors/email-type-not-found';
import { PasswordDoesNotMatchError } from '@management:errors/password-match';
import { TestHashProviderSymbol } from '@management:injection/providers/symbols';
import {
  TestEmailTypesRepositorySymbol,
  TestEmailsRepositorySymbol,
  TestManagersRepositorySymbol
} from '@management:injection/repositories/symbols';
import { DependencyInjection } from '@shared/injection';

import { ManagerCreationService } from '../manager-creation-service';

import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { HashProviderInterface } from '@management:provider-types/hash';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';
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

  beforeEach(() => {
    managersRepository = container[TestManagersRepositorySymbol];
    emailsRepository = container[TestEmailsRepositorySymbol];
    emailTypesRepository = container[TestEmailTypesRepositorySymbol];
    hashProvider = container[TestHashProviderSymbol];

    void emailTypesRepository.create(emailTypeData);

    service = new ManagerCreationService(
      managersRepository,
      emailsRepository,
      emailTypesRepository,
      hashProvider
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

  it('Should throw if password length < 8', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if password length > 20', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if password has sequence >= 3 ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if password has no number ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if password has no upper ', () => {});

  // *** --- e-mail ----------------------------------------------------- *** //

  it('Should throw if e-mail is not valid ', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if e-mail is in use', () => {});

  // *** --- names ------------------------------------------------------ *** //

  it('Should capitalize the name', () => {});

  // ------------------------------------------------------------------------ //

  it('Should capitalize the surname', () => {});

  // ------------------------------------------------------------------------ //

  it('Should trim the name', () => {});

  // ------------------------------------------------------------------------ //

  it('Should trim the surname', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if name length < 3', () => {});

  // ------------------------------------------------------------------------ //

  it('Should throw if surname length < 3', () => {});

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
