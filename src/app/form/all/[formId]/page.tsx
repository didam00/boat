"use client"

import QuestionBox from "@/components/QuestionBox";
import styles from "./page.module.scss";
import FormPageSideBox from "@/components/FormPageSideBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextPageContext } from "next";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function VotePage({
  params
}: {
  params: {
    formId: string
  }
}) {
  const [voteFormData, setVoteFormData] = useState<VoteFormType>();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = formRef.current as HTMLFormElement;
    const formData = new FormData(form);
    let userId;

    if (voteFormData?.isAllowAll) {
      userId = null;
    } else {
      userId = (await axios.get("/api/user/me")).data.data._id;
    }
    const responds: {
      questionId: string,
      type: string,
      content: string,
    }[] = []
    
    for (let e of formData.entries()) {
      responds.push({
        type: "txt",
        questionId: e[0],
        content: String(e[1])
      })
    }

    const res = await axios.post("/api/form/respond", {
      formId: voteFormData?._id ?? "",
      responds: responds,
      userId: userId
    })

    router.push("/form/all");
  }

  useEffect(() => {
    const getVoteFormData = async () => {
      const res = await axios.get(`/api/form/forms/${params.formId}`);
      setVoteFormData(res.data.data);
    }

    getVoteFormData();
  }, [params.formId])

  if (!voteFormData) {
    return <></>
  }

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`}>
        <article className={styles["vote-main"]}>
          <h2>Q. {voteFormData?.title}</h2>
          <span className={styles["category-list"]}>{voteFormData.category.join(" ")}</span>
          <form ref={formRef}>
            {voteFormData?.questions.map((q, i) => (
              <QuestionBox question={q} questionIndex={i} key={q._id}/>
            ))}
            <div style={{textAlign: "center"}}>
              <button
                className="submit-button"
                onClick={handleSubmit}
              >설문 완료</button>
            </div>
          </form>
        </article>
        <FormPageSideBox questions={voteFormData ? voteFormData.questions : []} />
      </div>
    </main>
  )
}