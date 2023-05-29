import { z as zod } from 'zod';

import { AppError } from '@shared/errors/app-error';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';

// * ---------------------------------------------------------------------- * //

class ManagementValidationProvider {
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
  private readonly EmailTypeSchema = zod.string().trim();

  // ------------------------------------------------------------------------ //

  validateManagerCreationData(data: ManagerCreationData): ManagerCreationData {
    const schema = zod.object({
      name: this.nameSchema,
      surname: this.nameSchema,
      password: this.passwordSchema,
      passwordConfirmation: this.passwordSchema,
      emailAddress: this.emailSchema,
      emailType: this.EmailTypeSchema
    });

    const result = schema.safeParse(data);

    if (!result.success) throw new AppError(result.error.message);

    return result.data;
  }
}

// * ---------------------------------------------------------------------- * //

export { ManagementValidationProvider };
