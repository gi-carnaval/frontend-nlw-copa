import styles from './styles.module.scss'

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.cLoader}></div>
    </div>
  );
}