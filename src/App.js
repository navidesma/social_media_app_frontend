import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./UI/Navbar/Navbar";
import UserPage from "./Pages/UserPage/UserPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import FollowPage from "./Pages/FollowPage/FollowPage";
import CreatePost from "./Pages/CreatePost/CreatePost";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Notification from "./UI/Notification/Notification";
import SearchPage from "./Pages/SearchPage/SearchPage";
import UserSettingsPage from "./Pages/UserSettingsPage/UserSettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeFollowing } from "./store/user-actions";

function App() {
  const { notification, loggedIn } = useSelector((state) => state.ui);
  // const {
  //   show: showNotification,
  //   mode: notificationMode,
  //   header: notificationHeader,
  //   message: notificationMessage,
  // } = notification;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFollowing());
  }, [dispatch]);

  return (
    <>
      {notification.show && <Notification props={{...notification}} />}
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
      {loggedIn && <Navbar />}
    </>
  );
}

export default App;
