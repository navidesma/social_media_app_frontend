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
      
    },
    removeFromFollowing(state, action) {
      
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
