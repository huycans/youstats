import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { youtubeAPI } from "../API/youtube";
const initialState = {
  channelResults: []
};

//action as thunk
export const fetchYoutubeChannelsByKeyword = createAsyncThunk(
  "youtube/fetchChannelsByKeyword",
  async (keyword, thunkAPI) => {
    return await youtubeAPI.fetchYoutubeChannelsByKeyword(keyword);
  }
);

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchYoutubeChannelsByKeyword.fulfilled,
      (state, action) => {
        state.channelResults = action.payload.items;
      }
    );
  }
});

// export const {  } = youtubeSlice.actions;
export default youtubeSlice.reducer;
