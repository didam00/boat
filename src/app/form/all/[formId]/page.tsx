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
  // const [tokenCheck, setTokenCheck] = useState(false);
  const [isUser, setIsUser] = useState(true);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       await (await fetch("/api/user/me")).json();
  //     } catch (error: any) {
  //       setIsUser(false);
  //       if (voteFormData && !voteFormData.isAllowAll) {
  //         router.push("/login");
  //         alert("회원만 접근할 수 있습니다.");
  //       }
  //     }
  //   }

  //   if (voteFormData && !tokenCheck) {
  //     checkToken();
  //     setTokenCheck(true);
  //     console.log(voteFormData?.isAllowAll);
  //   }
  // }, [voteFormData])

  useEffect(() => {
    const getVoteFormData = async () => {
      
      const res = await (await fetch(`/api/form/forms/${params.formId}`)).json();
      setVoteFormData(res.data);
    }

    getVoteFormData();
    
  }, [params.formId])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!voteFormData) {
      console.error("voteFormData is not loaded yet");
      return;
    }

    console.log(voteFormData.isAllowAll);

    const form = formRef.current as HTMLFormElement;
    let userId;

    if ((voteFormData.isAllowAll ?? false) && !isUser) {
      userId = null;
    } else {
      userId = (await (await fetch("/api/user/me")).json()).data._id;
    }

    const responds: {
      questionId: string,
      type: string,
      content: string,
    }[] = []
    
    const questionBoxList = form.querySelectorAll(".question-box") as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < voteFormData.questions.length; i++) {
      const questionData = voteFormData.questions[i];
      const questionBox = questionBoxList[i];
      switch (questionData.type) {
        case "choice":
        case "multi-choice":
          const checkeds = questionBox.querySelectorAll("input:checked") as NodeListOf<HTMLInputElement>;
          if (
            (questionData.minChoices && checkeds.length < questionData.minChoices)
            || (questionData.maxChoices && checkeds.length > questionData.maxChoices)
            || (checkeds.length === 0 && questionData.required)
          ) {
            errorShivering(questionBox);
            return;
          }
          checkeds.forEach(checked => {
            responds.push({
              questionId: questionData._id!,
              type: "txt",
              content: checked.value
            });
          })
          break;

        case "short":
          if (questionData.required
              && (questionBox.querySelector("input") as HTMLInputElement).value.trim() === ""
            ) {
            errorShivering(questionBox);
            return;
          }
          responds.push({
            questionId: questionData._id!,
            type: "txt",
            content: (questionBox.querySelector("input") as HTMLInputElement).value
          });
          break;

        case "multi-short":
          const answers = questionBox.querySelectorAll(".answer span") as NodeListOf<HTMLSpanElement>;
          if (questionData.required
            && answers.length === 0
          ) {
            errorShivering(questionBox);
            return;
          }
          answers.forEach(answer => {
            responds.push({
              questionId: questionData._id!,
              type: "txt",
              content: answer.innerText
            });
          });
          break;

        case "essay":
          if (questionData.required
            && (questionBox.querySelector("textarea") as HTMLTextAreaElement).value.trim() === ""
          ) {
            errorShivering(questionBox);
            return;
          }
          responds.push({
            questionId: questionData._id!,
            type: "txt",
            content: (questionBox.querySelector("textarea") as HTMLTextAreaElement).value
          });
      }
    }

    await fetch("/api/form/respond", {
      method: "POST",
      body: JSON.stringify({
        formId: voteFormData?._id ?? "",
        responds: responds,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    router.push("/form/all");
  }

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

const errorShivering = (questionBox: HTMLDivElement) => {
  window.scrollTo({
    top: questionBox.offsetTop - 100,
    behavior: "smooth"
  })
  questionBox.classList.add(styles["error-animation"]);
  setTimeout(() => {
    questionBox.classList.remove(styles["error-animation"]);
  }, 500);
}