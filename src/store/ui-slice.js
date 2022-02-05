import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userToken: '',
  mainUserId: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
