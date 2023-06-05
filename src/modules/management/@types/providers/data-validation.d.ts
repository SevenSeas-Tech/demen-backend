import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //

interface DataValidationProviderInterface {
  validateManagerCreationData(data: ManagerCreationData): ManagerCreationData | AppError;
}

// * ---------------------------------------------------------------------- * //

export type { DataValidationProviderInterface };
