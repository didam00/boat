"use client"

import styles from "./styles.module.scss";

export default function SkeletonIndex({
  toId,
  data,
  isHovered
}: {
  toId: string,
  data: QuestionType,
  isHovered: boolean
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
        width: Math.min((isHovered ? data.title.length*5 + 20 : data.title.length*2.5 + 10), 200)
      }}
    ></div>
  </a>
  )
}