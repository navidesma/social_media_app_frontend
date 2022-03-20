import styles from "./PostLink.module.css";
import { Link } from "react-router-dom";

const imagePrefix = "http://127.0.0.1:8080/";


function PostLink(props) {
  return (
    <div className={styles.post} id={props.post.postId}>
      <Link to={`/posts/${props.post.creator}`}>
        <img src={imagePrefix + props.post.imageUrl} alt="" />
      </Link>
    </div>
  );
}

export default PostLink;
