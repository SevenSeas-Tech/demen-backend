export type CreateVideoDto = {
  id: string;
  channelId: string;
  userId: string;
  subjectId: string;
  institution?: string;
  publishedAt: Date;
  teacher?: string;
  title: string;
  thumbnail: string;
};
