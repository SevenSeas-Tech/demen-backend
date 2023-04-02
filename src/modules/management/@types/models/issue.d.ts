import type { Manager } from './manager';
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

  // todo: create and import models:
  openedBy?: Student;
  video?: Video;
}

// * ---------------------------------------------------------------------- * //

export interface IssueType {
  name: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //

  issues?: Issue[];
}
