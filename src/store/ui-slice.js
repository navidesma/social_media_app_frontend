import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userToken: '',
  mainUserId: "aaa",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    login() {},
    logout() {},
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
