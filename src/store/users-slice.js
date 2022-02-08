import { createSlice } from "@reduxjs/toolkit";
import { navidPosts, pashmakolahPosts } from "./posts";

import navidLogo from "../img/new_logo.png";
import pashmakolahLogo from "../img/pashmakolah.png";

const navid = {
  userName: "navid_esma",
  info: "Navid Esma",
  following: ["aab"],
  followers: [],
  profilePicture: navidLogo,
  posts: navidPosts,
};
const pashmakolah = {
  userName: "pashmakolah",
  info: "Pashmakolah",
  following: [],
  followers: [],
  profilePicture: pashmakolahLogo,
  posts: pashmakolahPosts,
};

const users = { aaa: navid, aab: pashmakolah };

const usersSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    addUser() {},
    changeUserName() {},
    addToFollowing(state, action) {
      const userId = action.payload;

      state["aaa"].following.push(userId);

      state[`${userId}`].followers.push("aaa");
    },
    removeFromFollowing(state, action) {
      const userId = action.payload;

      const indexForMainUser = state["aaa"].following.indexOf(userId);
      state["aaa"].following.splice(indexForMainUser, 1);

      const indexForTargetUser = state[`${userId}`].followers.indexOf("aaa");
      state[`${userId}`].followers.splice(indexForTargetUser, 1);
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
