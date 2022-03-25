import styles from "./FollowItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFollowing, addToFollowing } from "../../store/user-actions";
import Button from "../SubscribeButton/SubscribeButton";
import { uiActions } from "../../store/ui-slice";

export default function FollowItem(props) {
  const dispatch = useDispatch();
  const { mainUserId, apiUrl } = useSelector((state) => state.ui);

  const { _id } = props.user;

  const { following } = useSelector((state) => state.user);

  let subscribed = false;
  if (following.includes(_id)) {
    subscribed = true;
  }

  const subHandler = () => {
    if (!subscribed) {
      dispatch(addToFollowing(_id));
    } else {
      dispatch(removeFromFollowing(_id));
    }
  };
  // console.log();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to={`/user/${_id}`}>
          <img src={apiUrl + props.user.profilePicture} alt="poster logo" />
          <h3>{props.user.name}</h3>
        </Link>
      </div>
      {!(_id === mainUserId) && <Button subscribed={subscribed} subHandler={subHandler} />}
    </div>
  );
}
