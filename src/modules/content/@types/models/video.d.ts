import type { Channel } from '@content:models/channel';
import type { Issue } from '@management:models/issue';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Video {
  id: string;
  channelId: string;
  institutionId?: Uuid;
  subjectId: Uuid;
  teacherId?: Uuid;
  userId: Uuid;

  description?: string;
  disabled: boolean;
  title: string;
  thumbnail: string;
  publishedAt: Date;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  addedBy?: Manager;
  channel?: Channel;

  issues?: Issue[];

  // todo: create and import models:
  institution?: Institution;
  teacher?: Teacher;
  subject: Subject;
}
