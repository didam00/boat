"use client"

import QuestionBox from "@/components/QuestionBox";
import styles from "./page.module.scss";
import FormPageSideBox from "@/components/FormPageSideBox";
import { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
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
  const router = useRouter()
  const [tokenCheck, setTokenCheck] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(voteFormData?.isAllowAll);

    const form = formRef.current as HTMLFormElement;
    const formData = new FormData(form);
    let userId;

    if ((voteFormData?.isAllowAll ?? false) && !isUser) {
      userId = null;
    } else {
      userId = (await (await fetch("/api/user/me")).json()).data._id;
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

    await fetch("/api/form/respond", {
      method: "POST",
      body: JSON.stringify({
        formId: voteFormData?._id ?? "",
        responds: responds,
        userId: userId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    router.push("/form/all");
  }

  useEffect(() => {
    const getVoteFormData = async () => {
      const res = await (await fetch(`/api/form/forms/${params.formId}`)).json();
      setVoteFormData(res.data);
    }

    getVoteFormData();
    
  }, [params.formId])

  useEffect(() => {
    const checkToken = async () => {
      try {
        await (await fetch("/api/user/me")).json();
      } catch (error: any) {
        setIsUser(false);
        if (voteFormData && !voteFormData.isAllowAll) {
          router.push("/login");
          alert("회원만 접근할 수 있습니다.");
        }
      }
    }

    if (voteFormData && !tokenCheck) {
      checkToken();
      setTokenCheck(true);
      console.log(voteFormData?.isAllowAll);
    }
  }, [voteFormData])

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