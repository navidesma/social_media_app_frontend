import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../../Components/PostItem/PostItem";

export default function PostsPage() {
  // const [posts, setPosts] = useState([]);

  // const { users } = useSelector((state) => state);

  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetch(
          "http://localhost:8080/user/get-user/" + userId
        );
        if (!result) {
          throw new Error("no user found");
        }
        const toJSON = await result.json();
        // console.log("!!!!!!!!!!!!!!1", toJSON.user);
        setUser(toJSON.user);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [userId]);

  // const user = users[`${userId}`];

  // useEffect(() => {
  //   setPosts(user.posts);
  // }, [user]);
  console.log(user);

  return (
    <>
      {user &&
        user.posts.map((post) => (
          <PostItem
            key={post._id}
            post={{
              ...post,
              creator: {
                _id: user._id,
                name: user.name,
                profilePicture: user.profilePicture,
              },
            }}
          />
        ))}
    </>
  );
}
