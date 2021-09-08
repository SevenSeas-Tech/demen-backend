import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: CreateUserDto): Promise<User> {
    const { username, name, lastName, email, password } = data;
    const user = new User();

    Object.assign(user, {
      id: username,
      username,
      name,
      last_name: lastName,
      email,
      password,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

export default FakeUsersRepository;
