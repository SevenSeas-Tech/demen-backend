export type ApiVideoResponseDTO = {
  items: {
    snippet: {
      channelId: string;
      description: string;
      publishedAt: Date;
      title: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
    };
  };
};
