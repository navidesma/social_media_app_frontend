import styles from "./SearchPage.module.css";
import Button from "../../Components/Button/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import FollowItem from "../../Components/FollowItem/FollowItem";

export default function SearchPage() {
  const { token, apiUrl } = useSelector((state) => state.ui);

  const [nameInputValue, setNameInputValue] = useState();

  const [users, setUsers] = useState([]);

  const nameInputChangeHandler = (event) => {
    setNameInputValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (nameInputValue) {
      const sendToBack = async () => {
        const response = await fetch(apiUrl + "user/search-users", {
          method: "POST",
          body: JSON.stringify({ target: nameInputValue }),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "Application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const {users} = await response.json();
        setUsers(users);
      };
      try {
        sendToBack();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className={styles.topSection}>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.formContainer}>
          <div className={styles.inputSection}>
            <input
              type="text"
              placeholder="enter a username"
              onChange={nameInputChangeHandler}
            />
            <Button type="submit">Find</Button>
          </div>
          </div>
        </form>
      </div>
      <hr />
      {users && users.map(user => <FollowItem key={user._id} user={user} />)}
    </>
  );
}
