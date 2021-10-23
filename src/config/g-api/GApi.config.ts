class GApiConfig {
  apiKey = process.env.API_KEY;
  baseUrl = 'https://www.googleapis.com';
  youtube = `${this.baseUrl}/youtube/v3`;
  channels = `${this.youtube}/channels`;
  videos = `${this.youtube}/videos`;
}

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

export default GApiConfig;
