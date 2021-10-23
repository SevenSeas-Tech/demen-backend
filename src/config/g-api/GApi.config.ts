const baseUrl = 'https://www.googleapis.com';
const youtube = `${baseUrl}/youtube/v3`;

export default {
  apiKey: process.env.API_KEY,
  channelsUrl: `${youtube}/channels`,
  videosUrl: `${youtube}/videos`,
  parts: 'snippet',
  videoFields: 'items(id,snippet(channelId,description,title,thumbnails,publishedAt))',
  channelFields: 'items(snippet(title,description,thumbnails))'
};

/*
  Example from API Docs:

    https://www.googleapis.com/youtube/v3/videos?
      id=7lCDEYXw3mM
      &key=YOUR_API_KEY
      &part=snippet,contentDetails,statistics,status

    https://www.googleapis.com/youtube/v3/videos?
      id=7lCDEYXw3mM
      &key=YOUR_API_KEY
      &fields=items(id,snippet(channelId,title,categoryId),statistics)
      &part=snippet,statistics

*/
