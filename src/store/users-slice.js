import { createSlice } from "@reduxjs/toolkit";
import { navidPosts } from "./posts";

import MainLogo from '../img/new_logo.png';

const navid = {
  userName: "navid_esma",
  info: "Navid Esma",
  following: "",
  followers: "",
  profilePicture: MainLogo,
  posts: navidPosts,
};

const users = {aaa: navid};

const usersSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    addUser() {},
    changeUserName() {},
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
