import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenId: "",
  accessToken: "",
  email: "",
  name: "",
  googleId: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signInSuccess: (state, action) => {
      const { tokenId, profileObj, tokenObj } = action.payload;
      const { email, name, googleId } = profileObj;
      const { accessToken } = tokenObj;
      state.tokenId = tokenId;
      state.email = email;
      state.name = name;
      state.googleId = googleId;
      state.accessToken = accessToken;
    },
    resetAuth: (state) => {
      state = initialState;
    }
  }
});

export const { signInSuccess, resetAuth } = authSlice.actions;
export default authSlice.reducer;
