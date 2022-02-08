import styles from "./PostLink.module.css";
import { Link } from "react-router-dom";

function PostLink(props) {
  return (
    <div className={styles.post} id={props.post.postId}>
      <Link to={`/posts/${props.post.userId}/${props.post.postId}`}>
        <img src={props.post.postImg} alt="" />
      </Link>
    </div>
  );
}

export default PostLink;
