import styles from "./styles.module.scss";

export default function FormRow({
  title, category, participants, isShort
}: {
  title: string,
  category: string,
  participants: number,
  isShort?: boolean
}) {
  return (
    <tr className={`${styles["row"]} ${isShort ? styles["short-form"] : ""}`}>
      <td className={styles["title-value"]}><span>{title}</span></td>
      <td className={styles["category-value"]}><span>{category}</span></td>
      <td className={styles["participants-value"]}><span>{participants}명 참여</span></td>
    </tr>
  )
}