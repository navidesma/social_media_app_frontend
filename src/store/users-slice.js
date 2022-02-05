import { createSlice } from "@reduxjs/toolkit";

const navidPosts = [
  { postId: "", posterId: "aaa", postImg: "", postDesc: "", postDate: "" },
  { postId: "", posterId: "aaa", postImg: "", postDesc: "", postDate: "" },
  { postId: "", posterId: "aaa", postImg: "", postDesc: "", postDate: "" },
];
const navid = {
  userId: "aaa",
  userName: "navid_esma",
  info: "Navid Esma",
  following: "",
  followers: "",
  profilePicture: "",
  posts: navidPosts,
};

const users = [navid];

const usersSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    addUser() {},
    changeUserName() {},

  }
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
