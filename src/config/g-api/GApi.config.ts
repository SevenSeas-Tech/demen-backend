const baseUrl = 'https://www.googleapis.com';
const youtube = `${baseUrl}/youtube/v3`;

export default {
  apiKey: process.env.API_KEY,
  channels: `${youtube}/channels`,
  videos: `${youtube}/videos`,
  parts: 'snippet',
  fields: 'items(id,snippet(channelId,description,title,thumbnails,publishedAt))'
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
