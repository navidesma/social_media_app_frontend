import styles from "./SignUp.module.css";
import {useState, useEffect} from "react";
export default function SignUp() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {URL.revokeObjectURL(objectUrl);};
  }, [selectedFile]);
  const selectHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(event.target.files[0])
  }
  const finishForm = (event) => {
    event.preventDefault();
    // validation and using ref is not added yet
    const fd = new FormData();
    fd.append("image", selectedFile);
    fd.append("email", "pashmak@test.ir");
    fd.append("name", "pashmakolah");
    fd.append("password", "salam12345");

    const sendAsync = async() => {
      const result = await fetch("http://127.0.0.1:8080/user/create-user", {method: "POST", body: fd})
      console.log(result);
    }
    sendAsync();
  }
  return (
    <div className={styles.formContainer} onSubmit={finishForm}>
      <form>
        <div>
          <label htmlFor="email">Enter a valid email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="name">Enter a Username</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="password">Enter a long password</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="image">Add Image:</label>
          <input type="file" id="image" onChange={selectHandler} />
          {selectedFile && (
            <img src={preview} alt="" className={styles.imagePreview} />
            )}
        </div>
            <button type="submit">Create User</button>
      </form>
    </div>
  );
}
