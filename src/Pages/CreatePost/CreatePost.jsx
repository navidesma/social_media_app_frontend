import styles from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, apiUrl } = useSelector((state) => state.ui);
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
        dispatch(uiActions.toggleNotification({mode: "loading", header: "Uploading the post", message: "Please Wait"}));
        const result = await fetch(`${apiUrl}pos/create-posts`, {
          method: "POST",
          body: fd,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!result.ok) {
          dispatch(uiActions.toggleNotification({mode: "error", header: "Couldn't upload the post", message: "Please try again"}));
          return;
        }
        dispatch(uiActions.toggleNotification());
        navigate("/");
      };
      try {
        sendAsync();
      } catch (err) {
        console.log(err);
      }
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
              <textarea
                id="desc"
                rows="4"
                cols="50"
                onChange={descChangeHandler}
              />
            </div>
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </div>
  );
}
