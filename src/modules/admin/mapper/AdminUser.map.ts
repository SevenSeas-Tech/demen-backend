import User from '@accounts:entities/User';
import { AdminUserResponseDto } from '@admin:dtos/users/AdminUserResponse.dto';

class AdminUserMap {
  static toDto({
    id,
    admin,
    username,
    email,
    name,
    last_name,
    created_at,
    updated_at
  }: User): AdminUserResponseDto {
    const user = {
      id,
      admin,
      username,
      email,
      name,
      lastName: last_name,
      createdAt: created_at,
      updatedAt: updated_at
    };

    return user;
  }
}

export default AdminUserMap;
