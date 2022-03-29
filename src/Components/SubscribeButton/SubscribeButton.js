import styles from "./SubscribeButton.module.css";

export default function SubscribeButton(props) {
  let buttonText = "Subscribe";
  let buttonStyle = styles.unSubscribed;
  if (props.subscribed) {
    buttonText = "Unsubscribe";
    buttonStyle = styles.subscribed;
  }

  if (props.isInUserPage) {
    buttonStyle = `${buttonStyle} ${styles.button} ${styles.inUserPage}`;
  }

  return (
    <button className={`${buttonStyle} ${styles.button}`} onClick={props.subHandler}>
      {buttonText}
    </button>
  );
}
