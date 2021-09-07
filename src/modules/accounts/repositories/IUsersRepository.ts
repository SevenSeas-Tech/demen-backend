import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import User from '@accounts:entities/User';

interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
}

export default IUsersRepository;
