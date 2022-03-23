import styles from "./SubscribeButton.module.css";

export default function SubscribeButton(props) {
  let buttonText = "Subscribe";
  let buttonStyle = styles.unSubscribed;
  if (props.subscribed) {
    buttonText = "Unsubscribe";
    buttonStyle = styles.subscribed;
  }

  if (props.isInUserPage) {
    buttonStyle = `${buttonStyle} ${styles.inUserPage}`;
  }

  return (
    <button className={buttonStyle} onClick={props.subHandler}>
      {buttonText}
    </button>
  );
}
