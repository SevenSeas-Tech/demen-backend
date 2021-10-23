export type ApiVideoResponseDTO = {
  channelId: string;
  description: string;
  publishedAt: string;
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
};
