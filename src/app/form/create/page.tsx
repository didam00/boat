"use client"

import styles from "./page.module.scss";
import { useState } from "react";
import SkeletonIndex from "@/components/SkeletonIndex/index.client";
import QuestionBox from "@/components/QuestionBox";

export default function CreateFormPage() {
  return (
    <main>
      <div className={`m__size`}>
        <CreateContainer />
        <SideBox />
      </div>
    </main>
  )
}


function CreateContainer() {
  let [questions, setQuestions] = useState<QuestionType[]>([])

  const addQuestion = function (event: React.MouseEvent<HTMLButtonElement>, index: number) {
    let newQuestion: QuestionType = {
      id: 1,
      type: "choice",
      title: "title",
      content: [],
      choices: [
        {
          type: "txt",
          data: "선택지",
        },
        {
          type: "txt",
          data: "선택지",
        },
        {
          type: "txt",
          data: "선택지",
        },
      ],
      hasOtherChoice: false,
      otherChoiceType: "any",
      hasParentQuestion: false,
    };
    
    console.log(index);

    setQuestions(
      [...questions.toSpliced(index, 1, newQuestion)]
    );
  }

  const updateQuestion = function (index: number, updatedQuestion: QuestionType) {
    setQuestions(
      [...questions.toSpliced(index, 1, updatedQuestion)]
    );
  }

  return (
    <section className={styles["create-main"]}>
      <input
        className={`clean ${styles["cp__h2"]} page_title-style`}
        type="text"
        placeholder="Q. 제목을 입력해주세요"
        autoComplete="off"
      />

      <AddQuestionButton index={0} callback={addQuestion} />
      
      <div className="question-blocks-container">
        {
          questions.map((question, i) => {
            console.log(question.title);

            return (
              <div className={styles["question-manager"]} key={i}>
                <QuestionBox
                  index={i}
                  question={question}
                  editable={true}
                  updateQuestion={updateQuestion}
                />
                <AddQuestionButton index={i} callback={addQuestion} />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

function SideBox() {
  return (
    <section className={`${styles["side"]} small-side`}>
      {/* <SkeletonIndex /> */}
    </section>
  )
}

function AddQuestionButton({
  index,
  callback
}: {
  index: number;
  callback: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}) {

  return (
    <button 
      className={styles["add-question-button"]}
      onClick={event => {
        callback(event, index);
      }}
    >
      <div>
        <span>이곳에 추가하기</span>
      </div>
    </button>
  )
}