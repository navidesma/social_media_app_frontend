import styles from "./UserPage.module.css";
import PostLink from "../../Components/PostLink/PostLink";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UserPage() {
  const { users } = useSelector((state) => state);
  const {mainUserId} = useSelector(state => state.ui);

  const { userId } = useParams();
  const logo = users[`${userId}`].profilePicture;
  const followers = users[`${userId}`].followers;
  const following = users[`${userId}`].following;
  const posts = users[`${userId}`].posts;

  // let subscribeButtonText;
  // const showSubscribeButton = userId !== ctx.mainUserId;
  // const subscribeButtonText = showSubscribeButton ? (ctx.users[`${ctx.mainUserId}`].following)
  // if (showSubscribeButton) {
  //   if (
  //     (ctx.users[`${ctx.mainUserId}`].following).includes(
  //       ctx.users[`${userId}`].username
  //     )
  //   ) {
  //     subscribeButtonText = "Unfollow";
  //   } else {
  //     subscribeButtonText = "Follow";
  //   }
  // }

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
              <p>{followers.length}</p>
              <p>Followers</p>
            </div>
            <div>
              <p>{following.length}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        {/* <div className={styles.subscribeContainer}>
          {showSubscribeButton && (
            <button type="btn" className={styles.subscribeButton}>
              {subscribeButtonText}
            </button>
          )}
        </div> */}
      </div>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostLink post={post} />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
