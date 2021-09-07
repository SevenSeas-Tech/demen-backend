import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import User from '@accounts:entities/User';
import { Email } from '@accounts:types/User';

interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: Email): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}

export default IUsersRepository;
