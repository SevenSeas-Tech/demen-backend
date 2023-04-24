import type { Issue } from '@management:models/issue';

// * ---------------------------------------------------------------------- * //

export type IssueType = {
  type: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //

  issues?: Issue[];
}
