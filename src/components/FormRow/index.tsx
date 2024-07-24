import styles from "./styles.module.scss";
import Link from "next/link";

export default function FormRow({
  id, title, category, votes, isShort, isSkeleton
}: {
  id?: string,
  title?: string,
  category?: string,
  votes?: number,
  isShort?: boolean
  isSkeleton?: boolean
}) {
  if (isSkeleton) {
    return (
      <tr className={`${styles["row"]} ${styles["skeleton"]}`}>
        <td className={styles["title-value"]}>
          <span></span>
        </td>
        <td className={styles["category-value"]}>
          <span></span>
        </td>
        <td className={styles["votes-value"]}>
          <span></span>
        </td>
      </tr>
    )
  }
  return (
    <tr className={`${styles["row"]} ${isShort ? styles["short-form"] : ""}`}>
      <td className={styles["title-value"]}>
        <span>
          <Link href={`/form/all/${id}`}>{title}</Link>
        </span>
      </td>
      <td className={styles["category-value"]}><span>{category}</span></td>
      <td className={styles["votes-value"]}>
        <span>
          <Link href={`/form/all/${id}/result`}>{votes}명 참여</Link>
        </span>
      </td>
    </tr>
  )
}