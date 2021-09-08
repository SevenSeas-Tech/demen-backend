import { CreateUserDto } from '@accounts:dtos/CreateUser.dto';
import User from '@accounts:entities/User';
import { Email } from '@accounts:types/users/User';

interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: Email): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}

export default IUsersRepository;
