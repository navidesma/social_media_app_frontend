import styles from "./PostsPage.module.css";

// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../../Components/PostItem/PostItem";
import { useQuery } from "react-query";
import { uiActions } from "../../store/ui-slice";

export default function PostsPage() {
  const { token } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const { userId } = useParams();
  const getPosts = async() => {
    const result = await fetch(
      "http://localhost:8080/user/get-user/" + userId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return await result.json();
  }
  const { data, status } = useQuery(`${userId}-posts`, getPosts, {
    keepPreviousData: true,
  });

  if (status === "loading") {
    dispatch(uiActions.toggleNotification({show: true, mode: "loading", header: "Fetching User Posts", message: "Please wait"}));
    return <div></div>;
  }
  if (status === "success") {
    dispatch(uiActions.toggleNotification());
  }
  if (status === "error") {
    dispatch(uiActions.toggleNotification({mode: "error", header: "Couldn't fetch user data", message: "Please try again"}));
  }

  return (
    <div className={styles.container}>
      {data.user.posts.map((post) => (
        <PostItem
          key={post._id}
          post={{
            ...post,
            creator: {
              _id: data.user._id,
              name: data.user.name,
              profilePicture: data.user.profilePicture,
            },
          }}
        />
      ))}
    </div>
  );
}
