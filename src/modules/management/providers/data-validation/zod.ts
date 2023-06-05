import { z as zod } from 'zod';

import { InvalidDataError } from '@shared/errors/invalid-data';
import { capitalize } from '@shared/utils/strings/capitalize';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { DataValidationProviderInterface } from '@management:provider-types/data-validation';
import type { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //

class ZodValidationProvider implements DataValidationProviderInterface {
  private readonly namesMinLength = 3;
  private readonly passwordMinLength = 8;
  private readonly passwordMaxLength = 20;
  private readonly passwordMinNumericDigits = 1;
  private readonly passwordMinUpperCase = 1;
  private readonly passwordMaxSequence = 2;

  private readonly passwordSchema = zod
    .string()
    .trim()
    .min(this.passwordMinLength)
    .max(this.passwordMaxLength);

  private readonly emailSchema = zod.string().trim().email();
  private readonly nameSchema = zod.string().min(this.namesMinLength);
  private readonly emailTypeSchema = zod.string().trim();

  // ------------------------------------------------------------------------ //

  validateManagerCreationData(data: ManagerCreationData): ManagerCreationData | AppError {
    const schema = zod.object({
      name: this.nameSchema,
      surname: this.nameSchema,
      password: this.passwordSchema,
      passwordConfirmation: this.passwordSchema,
      emailAddress: this.emailSchema,
      emailType: this.emailTypeSchema
    });

    const result = schema.safeParse(data);

    if (!result.success) return new InvalidDataError(result.error.message);

    const treatedData = this.treatData(result.data);

    return treatedData;
  }

  private treatData(data: ManagerCreationData): ManagerCreationData {
    data.name = capitalize(data.name);
    data.surname = capitalize(data.surname);

    data.emailAddress = data.emailAddress.toLowerCase();
    data.emailType = data.emailType.toLowerCase();

    return data;
  }
}

// * ---------------------------------------------------------------------- * //

export { ZodValidationProvider };

// *** --- annotations -------------------------------------------------- *** //
/*
  ? - zod does not have a built-in method to:
  ? - check if a string contains a sequence of characters.
  ? - check if a string contains a number.
  ? - check if a string contains an upper case character.

  todo: implement these validations.
*/
