import styles from "./HomePage.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostItem from "../../Components/PostItem/PostItem";

export default function HomePage() {
  const {token} = useSelector(state => state.ui);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetch("http://localhost:8080/post/get-posts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!posts) {
          throw new Error("no posts");
        }
        const toJSON = await posts.json();
        setPosts(toJSON.posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  console.log(posts);
  return (
    <>
      <h2>Home</h2>
      <div className={styles.container}>
        {posts && posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
