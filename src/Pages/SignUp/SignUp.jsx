import styles from "./SignUp.module.css";
import { useState, useEffect } from "react";
export default function SignUp() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [email, setEmail] = useState();
  const [name, setName] = useState(); 
  const [password, setPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();
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
  const selectHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(event.target.files[0]);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }
  const secondPasswordChangeHandler = (event) => {
    setSecondPassword(event.target.value);
  }
  const finishForm = (event) => {
    event.preventDefault();
    // validation and using ref is not added yet
    const fd = new FormData();
    fd.append("image", selectedFile);
    fd.append("email", "pashmak@test.ir");
    fd.append("name", "pashmakolah");
    fd.append("password", "salam12345");

    const sendAsync = async () => {
      const result = await fetch("http://127.0.0.1:8080/user/create-user", {
        method: "POST",
        body: fd,
      });
      console.log(result);
    };
    // sendAsync();
  };
  return (
      <div className={styles.mainContainer}>
        <h2>SignUp</h2>
        <div className={styles.formContainer} onSubmit={finishForm}>
          <form>
            <div className={styles.inputSection}>
              <label htmlFor="email">Enter a valid Email</label>
              <input type="email" id="email" onChange={emailChangeHandler} />
            </div>
            <div className={styles.inputSection}>
              <label htmlFor="name">Enter a Username</label>
              <input type="text" id="name" onChange={nameChangeHandler} />
            </div>
            <div className={styles.inputSection}>
              <label htmlFor="password">Enter a password</label>
              <input type="password" id="password" onChange={passwordChangeHandler} />
            </div>
            <div className={styles.inputSection}>
              <label htmlFor="password2">Repeat the password</label>
              <input type="password" id="password2" onChange={secondPasswordChangeHandler} />
            </div>
            <div>
              <div className={styles.inputSection}>
                <label htmlFor="image">
                  Add Image for your profile picture:
                </label>
                <input type="file" id="image" onChange={selectHandler} />
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
