import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}