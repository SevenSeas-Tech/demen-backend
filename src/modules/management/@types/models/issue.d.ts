import type { Video } from '@content:models/video';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';
import type { Student } from '@students:models/student';

// * ---------------------------------------------------------------------- * //

export interface Issue {
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

// * ---------------------------------------------------------------------- * //

export interface IssueType {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //

  issues?: Issue[];
}
