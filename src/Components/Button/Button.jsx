import styles from "./Button.module.css";

export default function Button(props) {
  let additionalStyles = {};
  if (props.style) {
    additionalStyles = props.style;
  }
  return (
    <button type={props.type} className={styles.button} style={additionalStyles} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}