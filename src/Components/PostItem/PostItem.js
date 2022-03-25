import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../SubscribeButton/SubscribeButton";
import styles from "./PostItem.module.css";
import { addToFollowing, removeFromFollowing } from "../../store/user-actions";
import { useEffect } from "react";

export default function PostItem(props) {
  const { apiUrl } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const { following } = useSelector((state) => state.user);

  const userId = props.post.creator._id;

  const { mainUserId } = useSelector((state) => state.ui);


  let subscribed = false;
  if (following.includes(userId)) {
    subscribed = true;
  }

  const subHandler = () => {
    if (!subscribed) {
      dispatch(addToFollowing(userId));
    } else {
      dispatch(removeFromFollowing(userId));
    }
  };
  return (
    <div className={styles.itemContainer} id={props.post.postId}>
      <div className={styles.posterInfo}>
        <Link to={`/user/${userId}`}>
          <img
            src={apiUrl + props.post.creator.profilePicture}
            alt="poster logo"
          />
          <h3>{props.post.creator.name}</h3>
        </Link>
        {!(mainUserId === userId) && (
          <Button subscribed={subscribed} subHandler={subHandler} />
        )}
      </div>
      <div className={styles.imgSection}>
        <img src={apiUrl + props.post.imageUrl} alt="post" />
      </div>
      <div className={styles.contentSection}>
        <p>{props.post.description}</p>
        <p className="date">{new Date(props.post.createdAt).toTimeString()}</p>
      </div>
    </div>
  );
}
