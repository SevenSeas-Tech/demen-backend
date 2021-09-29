import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import UserMap from '@accounts:mapper/User.map';

interface IRequestDto {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}
class ShowProfile {
  async execute(data: IRequestDto): Promise<UserResponseDto> {
    const { id, username, email, name, lastName, admin, createdAt, updatedAt } = data.user;
    const user = {
      id,
      username,
      password: '',
      email,
      name,
      last_name: lastName,
      admin,
      created_at: createdAt,
      updated_at: updatedAt
    };
    return UserMap.toDto(user);
  }
}

export default ShowProfile;
