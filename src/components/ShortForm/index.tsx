'use client';

import { useState } from "react";
import styles from "./styles.module.scss";

export default function ShortForm({
  title,
  desc,
  open = false
}: {
  title: string;
  desc: string;
  open?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(open);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles["short-form"]} ${isOpen ? styles["open"] : ''} box-container`}
      role="article"
      onClick={toggleOpen}
    >
      <div className={styles["title-container"]}>
        <h3 className={styles["title"]}>{title}</h3>
        <div style={{flex: "1 0 0"}}></div>
        <div className="show-more-container">
          {/* <img src="/svgs/expand_more.svg" alt="show more" /> */}
          <span className={`material-symbols-outlined ${styles["show-more-icon"]}`}>
            expand_more
          </span>
        </div>
      </div>
      <div className={styles["form-desc"]}>
        {desc}
      </div>
    </div>
  )
}