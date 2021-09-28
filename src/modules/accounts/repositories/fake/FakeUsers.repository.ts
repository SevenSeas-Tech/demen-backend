import { v4 as uuid } from 'uuid';

import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsers.repository';

// ---------------------------------------------------------------------------------------------- //

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: CreateUserDto): Promise<User> {
    const { username, name, lastName, email, password } = data;
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      username,
      name,
      last_name: lastName,
      email,
      password,
      created_at: Date.now(),
      updated_at: Date.now()
    });

    this.users.push(user);

    return user;
  }

  // -------------------------------------------------------------------------------------------- //

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  // -------------------------------------------------------------------------------------------- //

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  // -------------------------------------------------------------------------------------------- //

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  // -------------------------------------------------------------------------------------------- //

  async update(data: UpdateUserDto): Promise<User> {
    const { id, name, lastName } = data;
    const index = this.users.findIndex(user => user.id === id);

    this.users[index].name = name;
    this.users[index].last_name = lastName;
    this.users[index].updated_at = new Date();

    return this.users[index];
  }
}

export default FakeUsersRepository;
