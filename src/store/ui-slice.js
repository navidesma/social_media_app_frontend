import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  mainUserId: localStorage.getItem("mainUserId") || null,
  loggedIn: localStorage.getItem("token")? true : false,
  notification: {show: false, mode: null, header: null, message: null},
  apiUrl: "http://127.0.0.1:8080/"
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
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("mainUserId");
      state.token = null;
      state.mainUserId = null;
      state.loggedIn = false;
    },
    toggleNotification(status, action) {
      if (action.payload) {
        status.notification.mode = action.payload.mode;
        status.notification.header = action.payload.header;
        status.notification.message = action.payload.message;
        status.notification.show = true;
      } else {
        status.notification.show = false;
      }
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
