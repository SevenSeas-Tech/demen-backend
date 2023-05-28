import type { ManagerResponseData } from '@management:dto/manager/manager-response';
import type { Manager } from '@management:models/manager';

// * ---------------------------------------------------------------------- * //

class ManagerToResponseMapper {
  static removePassword(data: Manager): ManagerResponseData {
    const {
      id,
      name,
      surname,
      isActive,
      emails,
      issues,
      phones,
      tokens,
      videos,
      createdAt,
      updatedAt
    } = data;

    const managerResponse: ManagerResponseData = {
      id,
      isActive,
      name,
      surname,
      createdAt,
      updatedAt,
      emails,
      issues,
      phones,
      tokens,
      videos
    };

    return managerResponse;
  }
}

// * ---------------------------------------------------------------------- * //

export { ManagerToResponseMapper };
