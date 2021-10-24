export type ApiChannelResponseDTO = {
  items: {
    snippet: {
      description: string;
      title: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
    };
  };
};
