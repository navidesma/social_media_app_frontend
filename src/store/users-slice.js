import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser() {},
    changeUserName() {},
    addToFollowing(state, action) {
      // const userId = action.payload;

      // state["aaa"].following.push(userId);

      // state[`${userId}`].followers.push("aaa");
    },
    removeFromFollowing(state, action) {
      // const userId = action.payload;

      // const indexForMainUser = state["aaa"].following.indexOf(userId);
      // state["aaa"].following.splice(indexForMainUser, 1);

      // const indexForTargetUser = state[`${userId}`].followers.indexOf("aaa");
      // state[`${userId}`].followers.splice(indexForTargetUser, 1);
    },
  },
});

export const usersActions = userSlice.actions;

export default userSlice.reducer;
