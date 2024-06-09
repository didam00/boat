import styles from "./styles.module.scss";

export default function LineNotice({
  text,
  type,
}: {
  text: string,
  type?: string
}) {
  return (
    <div className={styles["notice-container"]}>
      <span className={"material-symbols-outlined " + styles["fire-icon"]}>
        local_fire_department
      </span>
      <span>
        {text}
      </span>
    </div>
  )
}