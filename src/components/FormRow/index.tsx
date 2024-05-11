import styles from "./styles.module.scss";

export default function FormRow({
  title, category, participants
}: {
  title: string,
  category: string,
  participants: number
}) {
  return (
    <tr className={styles["row"]}>
      <td className={styles["title-value"]}>{title}</td>
      <td className={styles["category-value"]}>{category}</td>
      <td className={styles["participants-value"]}>{participants}명 참여</td>
    </tr>
  )
}