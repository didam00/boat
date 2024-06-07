"use client"

import SkeletonIndex from "@/components/SkeletonIndex/index.client";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function FormPageSideBox({
  voteFormData
}: {
  voteFormData: VoteFormType
}) {
  const [isHovered, setIsHovered] = useState(false);
  const skeletonIndexList: React.ReactNode[] = voteFormData.questions.map((data, i) => (
    <SkeletonIndex toId={`question-${i+1}`} data={data} isHovered={isHovered} />
  ))

  return (
    <div 
      className={`small-side ${styles["side"]}`}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <div className={styles["skeleton-index-list-container"]}>
        {skeletonIndexList}
      </div>
    </div>
  )
}