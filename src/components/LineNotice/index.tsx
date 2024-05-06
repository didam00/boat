import styles from "./styles.module.scss";

export default function LineNotice({
  children,
  type
}: {
  children?: React.ReactNode
  type?: string
}) {
  return (
    <div className={`m__size ${styles["container"]}`}>
      {children}
    </div>
  )
}