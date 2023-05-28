import type { Video } from '@content:models/video';
import type { Email } from '@management:models/email';
import type { Issue } from '@management:models/issue';
import type { Phone } from '@management:models/phone';
import type { Token } from '@management:models/token';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type Manager = {
  id: Uuid;
  name: string;
  surname: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emails?: Email[];
  issues?: Issue[];
  phones?: Phone[];
  tokens?: Token[];
  videos?: Video[];
}

