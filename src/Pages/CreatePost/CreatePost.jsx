import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const {token} = useSelector(state => state.ui);
  const [desc, setDesc] = useState("");

  const [formIsValid, setFormIsValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
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

  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };

  const finishForm = (event) => {
    event.preventDefault();
    setFormIsValid(true);

    if (!selectedFile) {
      setFormIsValid(false);
    }

    if (formIsValid) {
      const fd = new FormData();
      fd.append("description", desc.trim());
      fd.append("image", selectedFile);
      const sendAsync = async () => {
        const result = await fetch("http://127.0.0.1:8080/post/create-posts", {
          method: "POST",
          body: fd,
          headers: {
            Authorization: "Bearer " + token,
          }
        });
        console.log(result);
      };
      sendAsync();
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h2>Create New Post</h2>
      <div className={styles.formContainer} onSubmit={finishForm}>
        <form>
          <div>
            <div className={styles.inputSection}>
              <label htmlFor="image">Add Image:</label>
              <input type="file" id="image" onChange={imageChangeHandler} />
              {!formIsValid && <p>Each post should have an image</p>}
            </div>
            {selectedFile && (
              <img src={preview} alt="" className={styles.imagePreview} />
            )}
          </div>
          <div>
            <div className={styles.inputSection}>
              <label htmlFor="desc">Add Post Description:</label>
              <textarea id="desc" rows="4" cols="50" onChange={descChangeHandler} />
            </div>
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}
