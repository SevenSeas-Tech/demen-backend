import type { EmailListQuery } from '@management:dto/email/list';
import type { Email } from '@management:models/email';
import type { EmailsRepositoryInterface } from '@management:repositories/emails';

// * ---------------------------------------------------------------------- * //

class ListEmailsService {
  private emailsRepository: EmailsRepositoryInterface;

  constructor(emailsRepository: EmailsRepositoryInterface) {
    this.emailsRepository = emailsRepository;
  }

  async execute({ userId, typeId }: EmailListQuery): Promise<Email[]> {
    // todo: verify if data is valid;

    // todo: verify if there is filters;

    // todo: get emails from database;

    const emails = await this.emailsRepository.list({ userId, typeId });

    // todo: return a list of emails;

    return emails;
  }
}

// * ---------------------------------------------------------------------- * //

export { ListEmailsService };
