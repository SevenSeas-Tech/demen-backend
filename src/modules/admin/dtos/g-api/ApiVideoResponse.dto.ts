export type ApiVideoResponseDTO = {
  items: {
    snippet: {
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
  };
};
