import Link from "next/link";
import styles from "./styles.module.scss";

export default function Pagination({
  page, pageCount, setPage
}: {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}) {
  return (
    <ul className={styles["pagination-container"]}>
      {
        new Array(pageCount).fill(0).map((_, i) => (
          <li key={i+1}>
            <Link
              href={`./all?page=${i+1}`}
              onClick={() => {setPage(i+1)}}
              className={page == i+1 ? styles["active"] : ''}
            >
              {i+1}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}