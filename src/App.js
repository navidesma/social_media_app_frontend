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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/user-slice";

function App() {
  const { showNotification, mainUserId, token } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const result = await fetch(
          `http://localhost:8080/user/get-following-no-detail/` + mainUserId,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!result) {
          throw new Error("no user found");
        }
        const toJSON = await result.json();
        dispatch(userActions.initializeFollowing(toJSON.user.following))
      } catch (err) {
        console.log(err);
      }
    };
    getFollowing();
  }, [mainUserId, token, dispatch]);

  return (
    <>
      {showNotification && <Notification status="loading..." />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="user/:userId" element={<UserPage />} />
        <Route path="posts/:userId" element={<PostsPage />} />
        <Route path="follow" element={<FollowPage />} />
        <Route path="follow/:userId/:which" element={<FollowPage />} />
        <Route path="add-post" element={<CreatePost />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
