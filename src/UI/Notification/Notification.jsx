import styles from "./Notification.module.css";
import ReactDOM from "react-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Backdrop = (props) => {
  return <div className={styles.backdrop} />;
};

const NotificationOverlay = (props) => {
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2>{props.status}</h2>
        </header>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
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
        <NotificationOverlay status={props.status} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
