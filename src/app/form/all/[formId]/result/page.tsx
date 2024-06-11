"use client"

import axios from "axios";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { QuestionSchema } from "@/models/Questions";
import { VoteFormSchema } from "@/models/Forms";

export default function ResultPage({
  params
}: {
  params: {
    formId: string
  }
}) {
  const [voteFormData, setVoteFormData] = useState<VoteFormSchema>();

  useEffect(() => {
    const getVoteFormData = async () => {
      const res = await axios.get(`/api/form/forms/${params.formId}`);
      setVoteFormData(res.data.data);
    }

    getVoteFormData();
  })

  if (!voteFormData) return <></>;

  const figures: JSX.Element[] = voteFormData.questions.map((question, i) => {
    if (question.type === "essay" || question.type === "multi-short" || question.type === "short") {
      return (
        <div className={`box-container ${styles["essay-box"]}`}>
          <h3>{i+1}. {question.title}</h3>
          <ul>
            {
              question.responds.map((res, i) => (
                <li key={i}>{res.content}</li>
              ))
            }
          </ul>
        </div>
      )
    } else {
      const respondCounts = question.responds.reduce((acc: {[key: string]: number}, cur) => {
        acc[cur.content] = (acc[cur.content] || 0) + 1;
        return acc;
      }, {});
  
      const max = Math.max(...Object.values(respondCounts))
  
      const bars = Object.entries(respondCounts).map(([name, cnt], i) => (
        <div
          className={styles["bar"]}
          style={{
            height: (cnt / max) * 240
          }}
          key={i}
        >
          <span className={styles["name"]}>{name}</span>
          <span className={styles["cnt"]}>{cnt}</span>
        </div>
      ))
  
      return (
      <div className={`box-container ${styles["graph-box"]}`}>
        <h3>{i+1}. {question.title}</h3>
        <div className={styles["graph-container"]}>
          <div className={styles["bars-container"]}>
            {bars}
          </div>
        </div>
      </div>
      )
    }
  })

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`}>
        {figures}
      </div>
    </main>
  )
}