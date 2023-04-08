import type { Channel } from '@content:models/channel';
import type { Institution } from '@education:models/institution';
import type { Teacher } from '@education:models/teacher';
import type { Issue } from '@management:models/issue';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';
import type { Subject } from '@education:models/subject';

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
  institution?: Institution;
  issues?: Issue[];
  teacher?: Teacher;
  subject?: Subject;
}
