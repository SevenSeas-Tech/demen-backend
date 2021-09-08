import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '@accounts:dtos/CreateUser.dto';
import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsers.repository';

// ---------------------------------------------------------------------------------------------- //
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: CreateUserDto): Promise<User> {
    const { username, name, lastName, email, password } = data;
    const user = this.repository.create({ username, name, last_name: lastName, email, password });

    await this.repository.save(user);

    return user;
  }

  // *** ----------------------- Find Methods ----------------------------------------------- *** //

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({ username });
  }
}

export default UsersRepository;
