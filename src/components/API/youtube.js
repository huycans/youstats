const fetchYoutubeChannelsByKeyword = async (keyword) => {
  const MAX_RESULT = 6;
  const params = `?part=snippet&type=channel&maxResults=${MAX_RESULT}&q=${keyword}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/search" + params,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
  return await response.json();
};

export const youtubeAPI = { fetchYoutubeChannelsByKeyword };
