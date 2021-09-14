import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import User from '@accounts:entities/User';
import { Email, Uuid } from '@accounts:types/users/User';

interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findById(id: Uuid): Promise<User | undefined>;
  findByEmail(email: Email): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}

export default IUsersRepository;
