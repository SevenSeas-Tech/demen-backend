import type { Issue } from '@management:models/issue';

// * ---------------------------------------------------------------------- * //

export interface IssueType {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //

  issues?: Issue[];
}
