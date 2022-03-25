import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowItem from "../../Components/FollowItem/FollowItem";

export default function FollowPage() {
  const { userId, which } = useParams();

  const {token} = useSelector(state => state.ui);

  // const { users } = useSelector((state) => state);
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    const getFollow = async () => {
      try {
        const result = await fetch(
          `http://localhost:8080/user/get-${which}/` + userId,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!result.ok) {
          throw new Error("no user found");
        }
        const toJSON = await result.json();
        console.log("!!!!!!!!!!!!!!1", toJSON.user.followers);
        if (which === "followers") {
          setFollow(toJSON.user.followers);
        } else if (which === "following") {
          setFollow(toJSON.user.following);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFollow();
  }, []);

  return (
    <>
      {follow &&
        follow.map((user) => <FollowItem key={user._id} user={user} />)}
    </>
  );
}
