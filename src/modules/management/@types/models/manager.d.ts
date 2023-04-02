import type { Issue } from './issue';
import type { Phone } from './phone';
import type { Email } from './email';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Manager {
  id: Uuid;
  name: string;
  lastName: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  emails?: Email[];
  issues?: Issue[];
  phones?: Phone[];

  // todo: create and import models:
  tokens?: Token[];
  videos?: Video[];
}

