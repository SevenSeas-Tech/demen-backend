import { inject, injectable } from 'tsyringe';

import { CreateUserDto } from '@accounts:dtos/CreateUserDto';
import { UserResponseDto } from '@accounts:dtos/UserResponseDto';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import UserMap from '@accounts:mapper/UserMap';
import IHashProvider from '@shared/containers/providers/hash-provider/IHashProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, name, lastName, password } = data;

    const findByUsername = await this.usersRepository.findByUsername(username);

    if (findByUsername) {
      throw new AppError('Username already in use!');
    }

    const findByEmail = await this.usersRepository.findByEmail(email);

    if (findByEmail) {
      throw new AppError('Email already in use!');
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      name,
      lastName,
      password: passwordHash,
    });

    return UserMap.toDto(user);
  }
}

export default CreateUser;