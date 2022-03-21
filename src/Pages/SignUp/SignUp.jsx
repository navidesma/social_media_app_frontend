import styles from "./SignUp.module.css";
import { useState, useEffect } from "react";
export default function SignUp() {
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
    setFormIsValid(true);
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
    if (!(emailIsValid && nameIsValid && passwordIsValid && passwordIsValid && secondPasswordIsValid)) {
      setFormIsValid(false);
    }
    if (formIsValid) {
      const fd = new FormData();
      fd.append("image", selectedFile);
      fd.append("email", email.trim());
      fd.append("name", name.trim());
      fd.append("password", password.trim());
      const sendAsync = async () => {
        const result = await fetch("http://127.0.0.1:8080/auth/signup", {
          method: "PUT",
          body: fd,
        }); 
        console.log(result);
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
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}
