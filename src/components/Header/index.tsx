import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles["r__header"]}>
      <div className={styles["h__container"]}>
        <Link href="/">
          <img
            className={styles["h__logo_image"]}
            src="images/boat_title_logo.png"
            alt="logo image"
          />
        </Link>
        <nav className={styles["r__navbar"]}>
          <ul className={styles["navbar-menu"]}>
            <CategoryItem href="/short-forms-list">쇼트 폼</CategoryItem>
            <CategoryItem href="/all-forms-list">모든 설문</CategoryItem>
            <CategoryItem href="/my-page">마이페이지</CategoryItem>
          </ul>
          <div style={{flex: "1 0 0"}}></div>
          <Link href="/">
            <div className={styles["new_form-container"]}>
              <div className={styles["new_form-button"]}>
                새로운 폼 생성
              </div>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  )
}

function CategoryItem({ href, children }: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link className={styles["category-link"]} href={href}>
      <li className={styles["category_item"]}>
        <div className={styles["item-hover_shadow"]}>
          {children}
        </div>
      </li>
    </Link>
  )
}