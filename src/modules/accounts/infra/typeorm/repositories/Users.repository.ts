import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { User } from '@accounts:entities/User';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';

// ---------------------------------------------------------------------------------------------- //

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  // -------------------------------------------------------------------------------------------- //

  async create(data: CreateUserDto): Promise<User> {
    const { name, lastName, email, avatar, googleId } = data;
    const user = this.repository.create({ name, lastName, email, avatar, googleId });

    await this.repository.save(user);

    return user;
  }

  // -------------------------------------------------------------------------------------------- //

  async update(data: UpdateUserDto): Promise<User> {
    const { id, name, lastName } = data;

    const user = this.repository.create({ id, name, lastName });

    await this.repository.save(user);

    return user;
  }

  // *** ----------------------- Find Methods ----------------------------------------------- *** //

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  // -------------------------------------------------------------------------------------------- //

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    return this.repository.findOne({ googleId });
  }

  async findByFullName(name: string, lastName: string): Promise<User[]> {
    return this.repository.find({ name, lastName });
  }
}
