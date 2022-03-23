import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  mainUserId: localStorage.getItem("mainUserId") || null,
  loggedIn: localStorage.getItem("token")? true : false,
  notification: false,
  imagePrefix: "http://127.0.0.1:8080/"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("mainUserId");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("mainUserId", action.payload.userId);
      state.token = action.payload.token;
      state.mainUserId = action.payload.userId;
      state.loggedIn = true;
    },
    logout() {},
    showNotification(status, action) {
      status.showNotification = action.payload;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
