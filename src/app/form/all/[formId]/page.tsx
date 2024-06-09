"use client"

import QuestionBox from "@/components/QuestionBox";
import styles from "./page.module.scss";
import FormPageSideBox from "@/components/FormPageSideBox";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VotePage({
  params
}: {
  params: {
    formId: string
  }
}) {
  const [voteFormData, setVoteFormData] = useState<VoteFormType>();
  console.log(params.formId);

  useEffect(() => {
    const fetchForm = async () => {
      const res = await axios.get(`api/form/forms/${params.formId}`)
      setVoteFormData(res.data);
    }

    fetchForm();
  }, [params.formId]);

  if (!voteFormData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`}>
        <article className={styles["vote-main"]}>
          <h2>Q. {voteFormData?.title}</h2>
          <span className={styles["category-list"]}>{voteFormData?.category.join(" ")}</span>
          {voteFormData?.questions.map((q, i) => (
            <QuestionBox question={q} questionIndex={i} />
          ))}
        </article>
        <FormPageSideBox questions={voteFormData ? voteFormData.questions : []} />
      </div>
    </main>
  )
}