import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFollowing, removeFromFollowing } from "../../store/user-actions";
import styles from "./UserPage.module.css";
import PostLink from "../../Components/PostLink/PostLink";
import Button from "../../Components/SubscribeButton/SubscribeButton";
import { useQuery } from "react-query";
import { uiActions } from "../../store/ui-slice";

function UserPage() {
  const { token, apiUrl, mainUserId } = useSelector((state) => state.ui);
  const { following } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // To not get an error when you type url/user
  let { userId } = useParams();
  if (!userId) {
    userId = mainUserId;
  }

  const getUser = async () => {
    try {
      const result = await fetch(
        `${apiUrl}user/get-user/` + userId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return await result.json();
    } catch (err) {
      console.log(err);
    }
  };
  const { data, status } = useQuery(`${userId}-data`, getUser, {
    keepPreviousData: true,
  });

  if (status === "loading") {
    dispatch(
      uiActions.toggleNotification({
        mode: "loading",
        header: "Fetching User Data",
        message: "Please Wait",
      })
    );
    return <></>;
  }
  if (status === "success") {
    dispatch(uiActions.toggleNotification());
  }
  if (status === "error") {
    dispatch(
      uiActions.toggleNotification({
        mode: "error",
        header: "Couldn't fetch user data",
        message: "Please try again",
      })
    );
  }

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
    <>
      {data.user && (
        <div className={styles.main}>
          <div className={styles.topSectionContainer}>
            <div className={styles.upper}>
              <h2>{data.user.name}</h2>
              {userId === mainUserId && (
                <p>
                  <Link to="/user-settings">|||</Link>
                </p>
              )}
            </div>
            <div className={styles.middle}>
              <div className={styles.logo}>
                <img src={apiUrl + data.user.profilePicture} alt="" />
              </div>
              <div className={styles.followSection}>
                <div>
                  <p>{data.user.posts.length}</p>
                  <p>Posts</p>
                </div>
                <div>
                  <p>
                    <Link to={`/follow/${userId}/followers`}>
                      {data.user.followers.length}
                    </Link>
                  </p>
                  <p>
                    <Link to={`/follow/${userId}/followers`}>Followers</Link>
                  </p>
                </div>
                <div>
                  <p>
                    <Link to={`/follow/${userId}/following`}>
                      {data.user.following.length}
                    </Link>
                  </p>
                  <p>
                    <Link to={`/follow/${userId}/following`}>Following</Link>
                  </p>
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
            {data.user.posts.map((post) => (
              <PostLink key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserPage;
