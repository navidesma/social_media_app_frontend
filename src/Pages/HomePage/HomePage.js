import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostItem from "../../Components/PostItem/PostItem";


export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetch("http://localhost:8080/post/get-posts");
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
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
}
