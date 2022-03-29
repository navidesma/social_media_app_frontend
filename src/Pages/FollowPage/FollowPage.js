import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useParams } from "react-router-dom";
import FollowItem from "../../Components/FollowItem/FollowItem";

export default function FollowPage() {
  const dispatch = useDispatch();
  const { userId, which } = useParams();

  const {token} = useSelector(state => state.ui);

  // const { users } = useSelector((state) => state);
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    const getFollow = async () => {
      dispatch(uiActions.toggleNotification({mode: "loading", header: "Getting Followers/Following", message: "Please Wait"}));
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
        if (which === "followers") {
          setFollow(toJSON.user.followers);
        } else if (which === "following") {
          setFollow(toJSON.user.following);
        }
        dispatch(uiActions.toggleNotification());
      } catch (err) {
        console.log(err);
        dispatch(uiActions.toggleNotification({mode: "error", header: "Something went wrong", message: "Please try again"}));
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
