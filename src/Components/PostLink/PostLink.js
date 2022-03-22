import styles from "./PostLink.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function PostLink(props) {
  const {imagePrefix} = useSelector(state => state.ui)
  return (
    <div className={styles.post} id={props.post.postId}>
      <Link to={`/posts/${props.post.creator}`}>
        <img src={imagePrefix + props.post.imageUrl} alt="" />
      </Link>
    </div>
  );
}

export default PostLink;
