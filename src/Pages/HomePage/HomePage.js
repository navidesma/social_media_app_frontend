import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostItem from "../../Components/PostItem/PostItem";

export default function HomePage() {
  const { users } = useSelector((state) => state);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    for (const userId in users) {
      setPosts((prevState) => prevState.concat(users[`${userId}`].posts));
    }
  }, [users]);

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.postId} post={post} />
      ))}
    </>
  );
}
