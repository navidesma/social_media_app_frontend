import styles from "./Login.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const {apiUrl} = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const finishForm = (event) => {
    event.preventDefault();
    setFormIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);

    if (email.trim() === "") {
      setEmailIsValid(false);
    }
    if (password.trim() === "" || password.trim().length < 8) {
      setPasswordIsValid(false);
    }
    if (!(emailIsValid && passwordIsValid)) {
      setFormIsValid(false);
    }
    if (formIsValid) {
      const body = {email: email.trim(), password: password.trim()}

      const sendAsync = async () => {
        const result = await fetch(`${apiUrl}auth/login`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {"Content-Type": "Application/json"}
        });
        if (!result.ok) {
          // show error
          return;
        }
        const tokenAndMainUserId = await result.json()
        dispatch(uiActions.login(tokenAndMainUserId));
        navigate("/");
      };
      sendAsync();
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h2>Login</h2>
      <div className={styles.formContainer}>
        <form onSubmit={finishForm}>
          <div className={styles.inputSection}>
            <label htmlFor="email">Enter Your Account's Email</label>
            <input type="email" id="email" onChange={emailChangeHandler} />
            {!emailIsValid && <p>Email should be provided</p>}
          </div>

          <div className={styles.inputSection}>
            <label htmlFor="password">Enter Your password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
            />
            {!passwordIsValid && (
              <p>
                Password should be provided and must be at least 8 characters
              </p>
            )}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.bottomContainer}>
      <h4>New User ?</h4>
      <button type="button" onClick={() => {
        navigate("/signup")
      }}>Create A New User</button> 
      </div>
    </div>
  );
}
