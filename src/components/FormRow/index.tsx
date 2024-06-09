import styles from "./styles.module.scss";
import Link from "next/link";

export default function FormRow({
  title, category, votes, isShort
}: {
  title: string,
  category: string,
  votes: number,
  isShort?: boolean
}) {
  return (
    <tr className={`${styles["row"]} ${isShort ? styles["short-form"] : ""}`}>
      <td className={styles["title-value"]}>
        <span>
          <Link href="/form/all/1">{title}</Link>
        </span>
      </td>
      <td className={styles["category-value"]}><span>{category}</span></td>
      <td className={styles["votes-value"]}><span>{votes}명 참여</span></td>
    </tr>
  )
}