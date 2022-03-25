import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  following: [],
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    initializeFollowing(state, action) {
      state.following = action.payload;
    },
    addToFollowing(state, action) {
      state.following.push(action.payload);
    },
    removeFromFollowing(state, action) {
      state.following = state.following.filter(userId => userId !== action.payload);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
