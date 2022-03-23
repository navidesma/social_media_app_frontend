import styles from "./HomePage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import PostItem from "../../Components/PostItem/PostItem";
import { useQuery } from "react-query";
import Button from "../../Components/Button/Button";
import { useState } from "react";

export default function HomePage() {
  const { token } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const getPosts = async ({ queryKey }) => {
    const result = await fetch("http://localhost:8080/post/get-posts", {
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
    dispatch(uiActions.showNotification(true));
    return <div></div>;
  }
  if (status === "success") {
    dispatch(uiActions.showNotification(false));
  }
  return (
    <>
      <h2>Home</h2>
      <div className={styles.container}>
        {data.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => setPage((old) => old - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((old) => old + 1)}
            disabled={isPreviousData || page === data.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
