import { useEffect, useState } from "react";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
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
    const fd = new FormData();
    fd.append("description", "DESC_" +  new Date().toISOString());
    fd.append("image", selectedFile);

    const sendAsync = async() => {
      const result = await fetch("http://127.0.0.1:8080/post/create-posts", {method: "POST", body: fd})
      console.log(result);
    }
    sendAsync();
  }
  return (
    <div className={styles.formContainer} onSubmit={finishForm}>
      <form>
        <div>
          <label htmlFor="image">Add Image:</label>
          <input type="file" id="image" onChange={selectHandler}/>
          {selectedFile && <img src={preview} alt="" className={styles.imagePreview}/>}
        </div>
        <div>
          <label htmlFor="desc">Add Post Description</label>
          <input type="text" id="desc" />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
