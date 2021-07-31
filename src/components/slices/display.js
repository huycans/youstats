import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldExpandSearchSection: true
};

//this slice manage display-related state
export const displaySlice = createSlice({
  name: "display",
  initialState: initialState,
  reducers: {
    expandSearchSection: (state) => {
      state.shouldExpandSearchSection = true;
    },
    collapseSearchSection: (state) => {
      state.shouldExpandSearchSection = false;
    }
  }
});

export const { expandSearchSection, collapseSearchSection, toggleSearch } =
  displaySlice.actions;
export default displaySlice.reducer;
