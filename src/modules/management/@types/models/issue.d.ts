import type { Video } from '@content:models/video';
import type { IssueType } from '@management:models/issue-type';
import type { Manager } from '@management:models/manager';
import type { Student } from '@students:models/student';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export type Issue = {
  id: Uuid;
  managerId?: Uuid;
  studentId: Uuid;
  typeId: string;
  videoId: Uuid;

  closedAt?: Date;
  description: string;
  isOpen: boolean;
  review?: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  closedBy?: Manager;
  openedBy?: Student;
  type?: IssueType;
  video?: Video;
}

