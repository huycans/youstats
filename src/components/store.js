import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import displayReducer from "./slices/display";
import youtubeReducer from "./slices/youtube";

export default configureStore({
  reducer: {
    auth: authReducer,
    youtube: youtubeReducer,
    display: displayReducer
  }
});
