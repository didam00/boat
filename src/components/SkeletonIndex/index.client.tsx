"use client"

import styles from "./styles.module.scss";

export default function SkeletonIndex({
  toId,
  data
}: {
  toId: string,
  data: QuestionType
}) {

  return (
    <a 
      href={`#${toId}`}
      onClick={(event) => {
        event.preventDefault();
        const target = document.getElementById(`${toId}`);
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60 - 16,
            behavior: 'smooth',
          });
        }
      }}
    >
    <div
      className={styles["skeleton-index"]}
      style={{
        width: Math.min(data.title.length*2 + 100, 200)
      }}
    ></div>
  </a>
  )
}