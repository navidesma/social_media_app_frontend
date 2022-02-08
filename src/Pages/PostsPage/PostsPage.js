import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../../Components/PostItem/PostItem";


export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  const { users } = useSelector((state) => state);

  const { userId, postId } = useParams();

  const user = users[`${userId}`];

  useEffect(() => {
    setPosts(user.posts);
  }, [user]);

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.postId} post={post} />
      ))}
    </>
  );
}
