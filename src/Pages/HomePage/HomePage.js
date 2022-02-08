import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostItem from "../../Components/PostItem/PostItem";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  
  const { users } = useSelector((state) => state);

  useEffect(() => {
    setPosts([]);
    for (const userId in users) {
      setPosts((prevState) => prevState.concat(users[`${userId}`].posts));
    }
  }, [users]);

  return (
    <>
    <h2>Home</h2>
      {posts.map((post) => (
        <PostItem key={post.postId} post={post} />
      ))}
    </>
  );
}
