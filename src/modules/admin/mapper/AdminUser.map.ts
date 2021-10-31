import User from '@accounts:entities/User';
import { AdminUserResponseDto } from '@admin:dtos/users/AdminUserResponse.dto';

class AdminUserMap {
  static toDto({
    id,
    admin,
    username,
    email,
    name,
    lastName,
    verified,
    videos,
    createdAt,
    updatedAt
  }: User): AdminUserResponseDto {
    const user = {
      id,
      admin,
      username,
      email,
      name,
      videos,
      verified,
      lastName,
      createdAt,
      updatedAt
    };

    return user;
  }
}

export default AdminUserMap;
