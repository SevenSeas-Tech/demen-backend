import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import { UserResponseDto } from '@accounts:dtos/UserResponseDto';

interface IUsersRepository {
  create(data: CreateUserDto): UserResponseDto;
}

export default IUsersRepository;
