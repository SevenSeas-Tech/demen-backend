import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }
}

export default UsersRepository;
