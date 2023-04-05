import type { Video } from '@content:models/video';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Issue {
  id: Uuid;
  managerId?: Uuid;
  studentId: Uuid;
  typeId: Uuid;
  videoId: Uuid;

  closedAt?: Date;
  description: string;
  isOpen: boolean;
  review?: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  closedBy?: Manager;
  type?: IssueType;
  video?: Video;

  // todo: create and import models:
  openedBy?: Student;
}

// * ---------------------------------------------------------------------- * //

export interface IssueType {
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //

  issues?: Issue[];
}
