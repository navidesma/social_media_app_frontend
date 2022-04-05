import styles from "./HomePage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import PostItem from "../../Components/PostItem/PostItem";
import { useQuery } from "react-query";
import Button from "../../Components/Button/Button";
import { useState } from "react";

const buttonAdditionalStyle = { margin: "0 5px" };

export default function HomePage() {
  const { token, apiUrl } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const getPosts = async ({ queryKey }) => {
    const result = await fetch(`${apiUrl}post/get-posts`, {
      headers: {
        Authorization: "Bearer " + token,
        currentPage: queryKey[1],
      },
    });
    return await result.json();
  };
  const { data, status, isPreviousData } = useQuery(
    ["home-posts", page],
    getPosts,
    {
      keepPreviousData: true,
    }
  );

  if (status === "loading") {
    dispatch(
      uiActions.toggleNotification({
        mode: "loading",
        header: "Fetching Posts",
        message: "Please Wait",
      })
    );
    return <></>;
  }
  if (status === "success") {
    dispatch(uiActions.toggleNotification());
  }
  if (status === "error") {
    dispatch(
      uiActions.toggleNotification({
        mode: "error",
        header: "Couldn't fetch posts",
        message: "Please try again",
      })
    );
  }
  return (
    <>
      <h2>Home</h2>
      <div className={styles.container}>
        {data.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
        {data.totalPages > 0 ? (
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setPage((old) => old - 1)}
              disabled={page === 1}
              style={buttonAdditionalStyle}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((old) => old + 1)}
              disabled={isPreviousData || page === data.totalPages || data.totalPages === 1}
              style={buttonAdditionalStyle}
            >
              Next
            </Button>
          </div>
        ) : (
          <p>No Posts From you or your followings</p>
        )}
      </div>
    </>
  );
}
