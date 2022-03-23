import styles from "./FollowItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { usersActions } from "../../store/users-slice";
import Button from "../SubscribeButton/SubscribeButton";
import { uiActions } from "../../store/ui-slice";



export default function FollowItem(props) {
  const dispatch = useDispatch();
  const {mainUserId, imagePrefix} = useSelector(state => state.ui);

  const { userId } = props;

  const users = useSelector((state) => state.users);

  // const { mainUserId } = useSelector((state) => state.ui);

  // const userName = users[`${userId}`].userName;
  // const logo = users[`${userId}`].profilePicture;

  
  let subscribed = false;
  // if (users[`${mainUserId}`].following.includes(userId)) {
  //   subscribed = true;
  // }

  const subHandler = () => {
    subscribed = !subscribed;
    if (subscribed) {
      dispatch(usersActions.addToFollowing(userId));
    } else {
      dispatch(usersActions.removeFromFollowing(userId));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to={`/user/${userId}`}>
          <img src={ imagePrefix + props.user.profilePicture} alt="poster logo" />
          <h3>{props.user.name}</h3>
        </Link>
      </div>
      {!(userId === mainUserId) && <Button subscribed={subscribed} subHandler={subHandler} />}
      {/* from here */}
    </div>
  );
}
