import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/users-slice";
import styles from "./UserPage.module.css";
import PostLink from "../../Components/PostLink/PostLink";
import Button from "../../Components/Button/Button";

function UserPage() {
  const { users } = useSelector((state) => state);
  const { mainUserId } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  // To not get an error when you type url/user
  let { userId } = useParams();
  if (!userId) {
    userId = mainUserId;
  }

  const logo = users[`${userId}`].profilePicture;
  const followers = users[`${userId}`].followers;
  const following = users[`${userId}`].following;
  const posts = users[`${userId}`].posts;

  let subscribed = false;
  if (users["aaa"].following.includes(userId)) {
    subscribed = true;
  }
  const subHandler = () => {
    subscribed = !subscribed;
    if (subscribed) {
      dispatch(usersActions.addToFollowing(userId));
    } else {
      dispatch(usersActions.removeFromFollowing(userId));
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.topSectionContainer}>
        <div className={styles.upper}>
          <h2>{users[`${userId}`].userName}</h2>
          {userId === mainUserId && <p>|||</p>}
        </div>
        <div className={styles.middle}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.followSection}>
            <div>
              <p>{posts.length}</p>
              <p>Posts</p>
            </div>
            <div>
              <p><Link to={`/follow/${userId}/followers`}>{followers.length}</Link></p>
              <p><Link to={`/follow/${userId}/followers`}>Followers</Link></p>
            </div>
            <div>
              <p><Link to={`/follow/${userId}/following`}>{following.length}</Link></p>
              <p><Link to={`/follow/${userId}/following`}>Following</Link></p>
            </div>
          </div>
        </div>
        {!(userId === mainUserId) && (
          <div className={styles.subscribeButtonContainer}>
            <Button
              isInUserPage={true}
              subscribed={subscribed}
              subHandler={subHandler}
            />
          </div>
        )}
      </div>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostLink key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
