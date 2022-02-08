import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowItem from "../../Components/FollowItem/FollowItem";

export default function FollowPage() {
  const { userId, which } = useParams();

  const { users } = useSelector((state) => state);

  let followList;
  if (which === "following") {
    followList = users[`${userId}`].following;
  } else if (which === "followers") {
    followList = users[`${userId}`].followers;
  }
  return (
    <>
      {followList &&
        followList.map((user) => <FollowItem key={user} userId={user} />)}
    </>
  );
}
