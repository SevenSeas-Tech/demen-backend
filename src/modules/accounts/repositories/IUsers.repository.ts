import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { User } from '@accounts:entities/User';
import { Email } from '@accounts:types/users/User';
import { Uuid } from '@shared/@types/Uuid';

// ---------------------------------------------------------------------------------------------- //

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: Uuid): Promise<User | undefined>;
  findByGoogleId(googleId: string): Promise<User | undefined>;
  findByFullName(name: string, lastName: string): Promise<User[]>;
  findByEmail(email: Email): Promise<User | undefined>;
  update(data: UpdateUserDto): Promise<User>;
}
