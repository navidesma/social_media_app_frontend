import styles from "./PostLink.module.css";
import { Link } from "react-router-dom";

function PostLink(props) {
  return (
    <div className={styles.post} id={props.post.id}>
      <Link to={`/posts/${props.post.posterId}#${props.post.postId}`}>
        <img src={props.post.postImg} alt="" />
      </Link>
    </div>
  );
}

export default PostLink;
