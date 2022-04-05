import styles from "./SignUp.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import Button from "../../Components/Button/Button";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {apiUrl} = useSelector(state => state.ui);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [secondPasswordIsValid, setSecondPasswordIsValid] = useState(true);
  // for the image state
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);
  const imageChangeHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(event.target.files[0]);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const secondPasswordChangeHandler = (event) => {
    setSecondPassword(event.target.value);
  };
  const finishForm = (event) => {
    event.preventDefault();
    setFormIsValid(false);
    setEmailIsValid(true)
    setNameIsValid(true)
    setPasswordIsValid(true)
    setSecondPasswordIsValid(true)

    if (email.trim() === "") {
      setEmailIsValid(false)
    }
    if (name.trim() === "" || name.trim().length < 5) {
      setNameIsValid(false)
    }
    if (password.trim() === "" || password.trim().length < 8) {
      setPasswordIsValid(false)
    }
    if (secondPassword !== password) {
      setSecondPasswordIsValid(false)
    }
    if (emailIsValid && nameIsValid && passwordIsValid && passwordIsValid && secondPasswordIsValid) {
      setFormIsValid(() => true);
    }
    if (formIsValid) {
      const fd = new FormData();
      fd.append("image", selectedFile);
      fd.append("email", email.trim());
      fd.append("name", name.trim());
      fd.append("password", password.trim());
      const sendAsync = async () => {
        dispatch(uiActions.toggleNotification({mode: "loading", header: "Signing Up", message: "Please Wait"}));
        const response = await fetch(`${apiUrl}auth/signup`, {
          method: "PUT",
          body: fd,
        });
        if (!response.ok) {
          dispatch(uiActions.toggleNotification({mode: "error", header: "Couldn't Log In", message: "Please try again"}));
          return;
        }
        const toJSON = await response.json()
        console.log(toJSON);
        dispatch(uiActions.toggleNotification());
        navigate("/login");
      };
      sendAsync();
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h2>SignUp</h2>
      <div className={styles.formContainer}>
        <form onSubmit={finishForm}>
          <div className={styles.inputSection}>
            <label htmlFor="email">Enter a valid Email</label>
            <input type="email" id="email" onChange={emailChangeHandler} />
            {!emailIsValid && <p>Email should be provided</p>}
          </div>
          <div className={styles.inputSection}>
            <label htmlFor="name">Enter a Username</label>
            <input type="text" id="name" onChange={nameChangeHandler} />
            {!nameIsValid && (
              <p>Name must not be empty and should be at least 5 characters</p>
            )}
          </div>
          <div className={styles.inputSection}>
            <label htmlFor="password">Enter a password</label>
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
          <div className={styles.inputSection}>
            <label htmlFor="password2">Repeat the password</label>
            <input
              type="password"
              id="password2"
              onChange={secondPasswordChangeHandler}
            />
            {!secondPasswordIsValid && <p>Passwords don't match</p>}
          </div>
          <div>
            <div className={styles.inputSection}>
              <label htmlFor="image">Add Image for your profile picture:</label>
              <input type="file" id="image" onChange={imageChangeHandler} />
            </div>
            {selectedFile && (
              <img src={preview} alt="" className={styles.imagePreview} />
            )}
          </div>
          <Button type="submit">Create User</Button>
        </form>
      </div>
      <div className={styles.bottomContainer}>
      <h4>Already A User ?</h4>
      <Button type="button" onClick={() => {
        navigate("/login")
      }}>Login</Button>
      </div>
    </div>
  );
}
