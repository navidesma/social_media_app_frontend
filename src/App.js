import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeFollowing } from "./store/user-actions";

import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./UI/Navbar/Navbar";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Notification from "./UI/Notification/Notification";

const UserPage = React.lazy(() => import("./Pages/UserPage/UserPage"));
const PostsPage = React.lazy(() => import("./Pages/PostsPage/PostsPage"));
const FollowPage = React.lazy(() => import("./Pages/FollowPage/FollowPage"));
const CreatePost = React.lazy(() => import("./Pages/CreatePost/CreatePost"));
const SearchPage = React.lazy(() => import("./Pages/SearchPage/SearchPage"));
const UserSettingsPage = React.lazy(() =>
  import("./Pages/UserSettingsPage/UserSettingsPage")
);

function App() {
  const { notification, loggedIn } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFollowing());
  }, [dispatch]);

  return (
    <>
      {notification.show && <Notification props={{ ...notification }} />}
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {!loggedIn && <Route path="/" element={<Login />} />}
          {loggedIn && (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="user/:userId" element={<UserPage />} />
              <Route path="posts/:userId" element={<PostsPage />} />
              <Route path="follow" element={<FollowPage />} />
              <Route path="follow/:userId/:which" element={<FollowPage />} />
              <Route path="add-post" element={<CreatePost />} />
              <Route path="search-users" element={<SearchPage />} />
              <Route path="user-settings" element={<UserSettingsPage />} />
            </>
          )}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      {loggedIn && <Navbar />}
    </>
  );
}

export default App;
