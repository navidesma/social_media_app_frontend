import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./PostItem.module.css";

export default function PostItem(props) {
  const { users } = useSelector((state) => state);
  const userId = props.post.userId;
  const userName = users[`${userId}`].userName;
  const logo = users[`${userId}`].profilePicture;

  return (
    <div className={styles.itemContainer} id={props.post.postId}>
      <div className={styles.posterInfo}>
        <Link to={`/user/${userId}`}>
          <img src={logo} alt="poster logo" />
          <h3>{userName}</h3>
        </Link>
      </div>
      <div className={styles.imgSection}>
        <img src={props.post.postImg} alt="post" />
      </div>
      <div className={styles.contentSection}>
        <p>{props.post.postDesc}</p>
        <p className="date">{props.post.postDate}</p>
      </div>
    </div>
  );
}
