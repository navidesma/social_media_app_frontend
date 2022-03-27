import styles from "./UserSettingsPage.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function UserSettingsPage() {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(uiActions.logout());
  };
  return (
    <div className={styles.mainContainer}>
      <h2>User Settings</h2>
      <div className={styles.optionsContainer}>
        <p onClick={logOutHandler}>
          <LogoutIcon />
          Logout
        </p>
      </div>
    </div>
  );
}
