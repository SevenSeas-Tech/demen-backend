import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';

// * ---------------------------------------------------------------------- * //

interface DataValidationProviderInterface {
  validateManagerCreationData(data: ManagerCreationData):
    ManagerCreationData | AppError;
}

// * ---------------------------------------------------------------------- * //

export type { DataValidationProviderInterface };
