import styles from "./index.module.css";

export default function CoinTableSkeleton() {
  return (
    <div className={styles.tableWrapper}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className={styles.skeleton} />
      ))}
    </div>
  );
}
