import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import { youtubeAPI } from "../API/youtube";

const initialState = {
  channelResults: [],
  currentChannel: {
    isEmpty: true,
    title: "",
    description: "",
    thumbnail: "",
    onYoutubeSince: "",
    country: "",
    uploads: "",
    viewCount: "",
    subscriberCount: "",
    videoCount: "",
    topics: [],
    kidsFriendly: false,
    bannerURL: ""
  },
  latestVideoId: ""
};

//thunk action
export const fetchYoutubeChannelsByKeyword = createAsyncThunk(
  "youtube/fetchYoutubeChannelsByKeyword",
  async (keyword, thunkAPI) => {
    try {
      return await youtubeAPI.fetchYoutubeChannelsByKeyword(keyword);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchYoutubeChannelInfo = createAsyncThunk(
  "youtube/fetchYoutubeChannelInfo",
  async (channelId, thunkAPI) => {
    try {
      if (channelId) {
        let response = await youtubeAPI.fetchYoutubeChannelInfo(channelId);
        thunkAPI.dispatch(
          fetchYoutubePlaylistById(
            response.items[0].contentDetails.relatedPlaylists.uploads
          )
        );
        return response;
      } else throw new Error("No channel found");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchYoutubePlaylistById = createAsyncThunk(
  "youtube/fetchYoutubePlaylistById",
  async (playlistId, thunkAPI) => {
    try {
      if (playlistId !== "")
        return await youtubeAPI.fetchYoutubePlaylistById(playlistId);
      else throw new Error("No playlist found");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
//END thunk action

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubeChannelsByKeyword.fulfilled, (state, action) => {
        state.channelResults = action.payload.items;
      })

      .addCase(fetchYoutubeChannelInfo.fulfilled, (state, action) => {
        const resultObj = action.payload.items[0];

        const getPropertyFromObjectCurried = function (obj, defaultValue) {
          //this util function check if an object has the given path, if yes return the value of that path
          //using curried function to define an obj and a default value first
          //then return another function that will receive a path
          //finally return the value of that path inside the obj
          return function (path) {
            return _.get(obj, path, defaultValue);
          };
        };
        const getPropertyAtPath = getPropertyFromObjectCurried(resultObj, "");
        state.currentChannel = {
          isEmpty: false,
          channelId: getPropertyAtPath("id.channelId"),
          title: getPropertyAtPath("snippet.title"),
          description: getPropertyAtPath("snippet.description"),
          thumbnailDefault: getPropertyAtPath("snippet.thumbnails.default.url"),
          thumbnailBig: getPropertyAtPath("snippet.thumbnails.high.url"),
          onYoutubeSince: getPropertyAtPath("snippet.publishedAt"),
          country: getPropertyAtPath("snippet.country"),
          uploads: getPropertyAtPath("contentDetails.relatedPlaylists.uploads"),
          viewCount: getPropertyAtPath("statistics.viewCount"),
          subscriberCount: getPropertyAtPath("statistics.subscriberCount"),
          videoCount: getPropertyAtPath("statistics.videoCount"),
          topics: getPropertyFromObjectCurried(
            resultObj,
            []
          )("topicDetails.topicIds"),
          kidsFriendly: getPropertyAtPath("status.madeForKids"),
          bannerURL: getPropertyAtPath(
            "brandingSettings.image.bannerExternalUrl"
          )
        };
      })
      .addCase(fetchYoutubePlaylistById.fulfilled, (state, action) => {
        state.latestVideoId = _.get(
          action,
          "payload.items[0].snippet.resourceId.videoId",
          0
        );
      })
      .addCase(fetchYoutubePlaylistById.rejected, (state, action) => {
        state.latestVideoId = "NA";
      });
  }
});

// export const {  } = youtubeSlice.actions;
export default youtubeSlice.reducer;
