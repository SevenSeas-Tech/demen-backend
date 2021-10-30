import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import User from '@accounts:entities/User';

class UserMap {
  static toDto({
    id,
    username,
    email,
    name,
    last_name,
    verified,
    created_at,
    updated_at
  }: User): UserResponseDto {
    const user = {
      id,
      username,
      email,
      name,
      verified,
      lastName: last_name,
      createdAt: created_at,
      updatedAt: updated_at
    };

    return user;
  }
}

export default UserMap;
