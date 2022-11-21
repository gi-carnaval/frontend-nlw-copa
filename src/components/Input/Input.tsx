import styles from "./styles.module.scss"

export function Input({ ...rest }) {
  return (
    <input
      className={styles.input}
      {...rest}
    />
  );
}