import { googleURL } from "./constants";

const fetchYoutubeChannelsByKeyword = async (keyword) => {
  const MAX_RESULT = 6;
  const params = `?part=snippet&type=channel&maxResults=${MAX_RESULT}&q=${keyword}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(googleURL.youtubeSearch + params, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  return await response.json();
};

const fetchYoutubeChannelInfo = async (channelId) => {
  const MAX_RESULT = 1;
  const params = `?part=snippet%2CbrandingSettings%2CcontentOwnerDetails%2Cid%2Clocalizations%2Cstatus%2CtopicDetails%2C%20contentDetails%2Cstatistics&id=${channelId}&maxResults=${MAX_RESULT}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(googleURL.youtubeChannelSearch + params, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  return await response.json();
};

const fetchYoutubePlaylistById = async (playlistId) => {
  const MAX_RESULT = 1;
  const params = `?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=${MAX_RESULT}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(googleURL.youtubePlaylistItemSearch + params, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  return await response.json();
};

export const youtubeAPI = {
  fetchYoutubeChannelsByKeyword,
  fetchYoutubeChannelInfo,
  fetchYoutubePlaylistById
};
