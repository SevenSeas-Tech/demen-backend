
// * ---------------------------------------------------------------------- * //

export interface Channel {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  videos?: Video[];
}
