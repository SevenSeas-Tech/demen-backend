import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@accounts:irepos/IUsers.repository';

// ---------------------------------------------------------------------------------------------- //
// Todo: implement user session
@injectable()
export class CreateUserSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<void> {
    throw new Error('');
  }
}
