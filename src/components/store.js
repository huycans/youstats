import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import youtubeReducer from './slices/youtube';

export default configureStore({
  reducer: {
    auth: authReducer,
    youtube: youtubeReducer
  }
});