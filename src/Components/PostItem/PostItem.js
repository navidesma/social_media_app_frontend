import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./PostItem.module.css";
import { usersActions } from "../../store/users-slice";

const imagePrefix = "http://127.0.0.1:8080/";

export default function PostItem(props) {
  const dispatch = useDispatch();

  // const users = useSelector((state) => state.users);
  const userId = props.post.creator._id;
  // const userName = users[`${userId}`].userName;
  // const logo = users[`${userId}`].profilePicture;

  const { mainUserId } = useSelector((state) => state.ui);

  let subscribed = false;
  // if (users["aaa"].following.includes(userId)) {
  //   subscribed = true;
  // }

  const subHandler = () => {
    // subscribed = !subscribed;
    // if (subscribed) {
    //   dispatch(usersActions.addToFollowing(userId));
    // } else {
    //   dispatch(usersActions.removeFromFollowing(userId));
    // }
  };
  return (
    <div className={styles.itemContainer} id={props.post.postId}>
      <div className={styles.posterInfo}>
        <Link to={`/user/${userId}`}>
          <img src={ imagePrefix + props.post.creator.profilePicture} alt="poster logo" />
          <h3>{props.post.creator.name}</h3>
        </Link>
        {!(mainUserId === userId) && (
          <Button subscribed={subscribed} subHandler={subHandler} />
        )}
      </div>
      <div className={styles.imgSection}>
        <img src={ imagePrefix + props.post.imageUrl} alt="post" />
      </div>
      <div className={styles.contentSection}>
        <p>{props.post.description}</p>
        <p className="date">{new Date(props.post.createdAt).toTimeString()}</p>
      </div>
    </div>
  );
}
