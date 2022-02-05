import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: { users: usersSlice, ui: uiSlice },
});

export default store;
