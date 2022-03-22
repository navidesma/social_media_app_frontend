import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/users-slice";
import styles from "./UserPage.module.css";
import PostLink from "../../Components/PostLink/PostLink";
import Button from "../../Components/Button/Button";
import { useEffect, useState } from "react";


function UserPage() {
  const {token, imagePrefix, mainUserId} = useSelector(state => state.ui)

  // To not get an error when you type url/user
  let { userId } = useParams();
  if (!userId) {
    userId = mainUserId;
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetch(
          "http://localhost:8080/user/get-user/" + userId,
          {
            headers: {
              Authorization: "Bearer " + token
            },
          }
        );
        if (!result) {
          throw new Error("no user found");
        }
        const toJSON = await result.json();
        setUser(toJSON.user);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  console.log(user);

  let subscribed = false;
  // if (user.following.includes(userId)) {
  //   subscribed = true;
  // }
  // const subHandler = () => {
  //   subscribed = !subscribed;
  //   if (subscribed) {
  //     dispatch(usersActions.addToFollowing(userId));
  //   } else {
  //     dispatch(usersActions.removeFromFollowing(userId));
  //   }
  // };
  return (
    <>
      {user && <div className={styles.main}>
        <div className={styles.topSectionContainer}>
          <div className={styles.upper}>
            <h2>{user.name}</h2>
            {userId === mainUserId && <p>|||</p>}
          </div>
          <div className={styles.middle}>
            <div className={styles.logo}>
              <img src={imagePrefix + user.profilePicture} alt="" />
            </div>
            <div className={styles.followSection}>
              <div>
                <p>{user.posts.length}</p>
                <p>Posts</p>
              </div>
              <div>
                <p>
                  <Link to={`/follow/${userId}/followers`}>
                    {user.followers.length}
                  </Link>
                </p>
                <p>
                  <Link to={`/follow/${userId}/followers`}>Followers</Link>
                </p>
              </div>
              <div>
                <p>
                  <Link to={`/follow/${userId}/following`}>
                    {user.following.length}
                  </Link>
                </p>
                <p>
                  <Link to={`/follow/${userId}/following`}>Following</Link>
                </p>
              </div>
            </div>
          </div>
          {/* {!(userId === mainUserId) && (
        <div className={styles.subscribeButtonContainer}>
          <Button
            isInUserPage={true}
            subscribed={subscribed}
            subHandler={subHandler}
          />
        </div>
      )} */}
        </div>
        <div className={styles.postsContainer}>
          {user.posts.map((post) => (
            <PostLink key={post._id} post={post} />
          ))}
        </div>
      </div>}
    </>
  );
}

export default UserPage;
