import styles from "./Notification.module.css";
import ReactDOM from "react-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "../../Components/Button/Button";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";


const Backdrop = (props) => {
  return <div className={styles.backdrop} />;
};

const NotificationOverlay = (props) => {
  const {mode, header, message} = props.props;
  const dispatch = useDispatch();
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2>{header}</h2>
        </header>
        <p>{message}</p>
        {mode === "loading" && <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>}
        {mode === "error" && <Button className={styles.button} onClick={() => {dispatch(uiActions.toggleNotification())}}>OK</Button>}
      </div>
    </div>
  );
};

export default function Notification(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <NotificationOverlay props={{...(props.props)}} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
