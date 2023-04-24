import type { Email } from '@management:models/email';
import type { EmailsRepository } from '@management:repositories/emails';

// * ---------------------------------------------------------------------- * //

class ListManagerEmailsService {
  private emailsRepository: EmailsRepository;

  constructor(emailsRepository: EmailsRepository) {
    this.emailsRepository = emailsRepository;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(userId: string): Promise<Email[]> {
    // todo: verify if data is valid;

    // todo: verify if there is filters;

    // todo: get emails from database;

    const emails = await this.emailsRepository.findByUser(userId);

    // todo: return a list of emails;

    return emails;
  }
}

// * ---------------------------------------------------------------------- * //

export { ListManagerEmailsService };
