"use client"

import styles from "./page.module.scss";
import { useState, Dispatch, SetStateAction } from "react";
import SkeletonIndex from "@/components/SkeletonIndex/index.client";
import QuestionBox from "@/components/QuestionBox";
import FormPageSideBox from "@/components/FormPageSideBox";

export default function CreateFormPage() {
  let [questions, setQuestions] = useState<Question[]>([])

  return (
    <main>
      <div className={`m__size`}>
        <CreateContainer questions={questions} setQuestions={setQuestions}/>
        <FormPageSideBox questions={questions}/>
      </div>
    </main>
  )
}

function CreateContainer({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) {
  let [defaultQuestionType, setDefaultQuestionType] = useState<QuestionType>("choice");

  const addQuestion = function (event: React.MouseEvent<HTMLButtonElement>, index: number) {
    let newQuestion: Question = {
      id: new Date().getTime(),
      type: defaultQuestionType,
      title: "",
      content: [],
      choices: [
        {
          type: "txt",
          data: "",
        },
        {
          type: "txt",
          data: "",
        },
        {
          type: "txt",
          data: "",
        },
      ],
      hasOtherChoice: false,
      otherChoiceType: "any",
      hasParentQuestion: false,
      required: false,
    };

    const newQuestions = [...questions];
    newQuestions.splice(index, 0, newQuestion)

    setQuestions(newQuestions);

    console.log(questions);
  }

  const updateQuestion = function (index: number, updatedQuestion?: Question) {
    const newQuestions = [...questions];

    if (updatedQuestion) {
      newQuestions.splice(index, 1, updatedQuestion);
    } else {
      newQuestions.splice(index, 1);
    }

    setQuestions(newQuestions);
  }

  return (
    <section className={styles["create-main"]}>
      <input
        className={`clean ${styles["cp__h2"]} page_title-style`}
        type="text"
        placeholder="Q. 제목을 입력해주세요"
        autoComplete="off"
      />

      <div className={`${styles["form-option"]}`}>
        <div className={styles["form-option-row"]}>
          <h5>폼 설정</h5>
          <div className="checkbox-container">
            <input type="checkbox" name="form-options" id="public-form-option" />
            <label htmlFor="public-form-option">공개 폼</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" name="form-options" id="short-form-option" />
            <label htmlFor="short-form-option">쇼트 폼</label>
          </div>
        </div>
        <div
          className={styles["form-option-row"]}
          onChange={(event: React.ChangeEvent<HTMLDivElement>) => {
            setDefaultQuestionType(event.target.id.slice(15) as QuestionType);
          }}
        >
          <h5>기본 문항 값</h5>
          <div className="radio-container">
            <input type="radio" name="default-question-options" id="default_option-choice" defaultChecked />
            <label htmlFor="default_option-choice">선택형</label>
          </div>
          <div className="radio-container">
            <input type="radio" name="default-question-options" id="default_option-multi-choice" />
            <label htmlFor="default_option-multi-choice">다중선택형</label>
          </div>
          <div className="radio-container">
            <input type="radio" name="default-question-options" id="default_option-short" />
            <label htmlFor="default_option-short">단답형</label>
          </div>
          <div className="radio-container">
            <input type="radio" name="default-question-options" id="default_option-multi-short" />
            <label htmlFor="default_option-multi-short">다답형</label>
          </div>
          <div className="radio-container">
            <input type="radio" name="default-question-options" id="default_option-essay" />
            <label htmlFor="default_option-essay">서술형</label>
          </div>
        </div>
      </div>

      <AddQuestionButton index={0} callback={addQuestion} />
      
      <div className="question-blocks-container">
        {
          questions.map((question, i) => {
            return (
              <div className={styles["question-manager"]} key={question.id}>
                <QuestionBox
                  questionIndex={i}
                  question={question}
                  editable={true}
                  updateQuestion={updateQuestion}
                />
                <AddQuestionButton index={i+1} callback={addQuestion} />
              </div>
            )
          })
        }
      </div>
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
      <span>이곳에 추가하기</span>
    </button>
  )
}