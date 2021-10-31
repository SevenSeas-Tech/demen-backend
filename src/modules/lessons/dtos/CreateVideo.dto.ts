export type CreateVideoDto = {
  channelId: string;
  userId: string;
  subjectId: string;
  institution?: string;
  publishedAt: Date;
  teacher?: string;
  title: string;
};
