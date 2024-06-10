"use client"

import styles from "./page.module.scss";
import React, { useState, Dispatch, SetStateAction } from "react";
import SkeletonIndex from "@/components/SkeletonIndex/index.client";
import QuestionBox from "@/components/QuestionBox";
import FormPageSideBox from "@/components/FormPageSideBox";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { title } from "process";

export default function CreateFormPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([])
  const [isPublic, setIsPublic] = useState(true);
  const [isShort, setIsShort] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [formTitle, setFormTitle] = useState<string>("");

  const uploadForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // valid 체크
    if (!formTitle.trim() || questions.length <= 0) {
      return;
    }

    const newQuestions = questions.map(({ _id, ...question}) => question);

    const newForm: VoteFormType = {
      isPublic: isPublic,
      isShortForm: isShort,
      category: category,
      votes: 0,
      views: 0,
      title: formTitle,
      author: ((await axios.get("/api/user/me")).data.data._id),
      questions: newQuestions,
    }

    const res = await axios.post("/api/form/upload", newForm);
    router.push("/");

    if (formTitle === "" && questions.length === 0) {
      alert("제목도 없고 내용도 없는 폼을 왜 올리시나요");
      return;
    }
  }

  return (
    <main>
      <div className={`m__size`}>
        <CreateContainer
          questions={questions}
          setQuestions={setQuestions}
          uploadForm={uploadForm}
          setIsPublic={setIsPublic}
          setIsShort={setIsShort}
          setFormTitle={setFormTitle}
          setCategory={setCategory}
        />
        <FormPageSideBox questions={questions}/>
      </div>
    </main>
  )
}

function CreateContainer({
  questions,
  setQuestions,
  uploadForm,
  setIsPublic,
  setIsShort,
  setFormTitle,
  setCategory,
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  uploadForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  setIsShort: Dispatch<SetStateAction<boolean>>;
  setFormTitle: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string[]>>;
}) {
  const [defaultQuestionType, setDefaultQuestionType] = useState<QuestionType>("choice");

  const addQuestion = function (event: React.MouseEvent<HTMLButtonElement>, index: number) {
    let newQuestion: Question = {
      _id: new Date().getTime().toString(36),
      type: defaultQuestionType,
      title: "",
      content: [],
      choices: [
        {
          id: uuidv4(),
          type: "txt",
          data: "",
        },
        {
          id: uuidv4(),
          type: "txt",
          data: "",
        },
        {
          id: uuidv4(),
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
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          setFormTitle(event.target.value)
        }}
        required={true}
      />

      <div className={`${styles["form-option"]}`}>
        <div className={styles["form-option-row"]}>
          <h5>폼 설정</h5>
          <div className="checkbox-container">
            <input type="checkbox" name="form-options" id="public-form-option"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsPublic(event.target.checked)
              }}
            />
            <label htmlFor="public-form-option">공개 폼</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" name="form-options" id="short-form-option"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsShort(event.target.checked)
              }}
            />
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
        <div
          className={styles["form-option-row"]}
          onChange={(event: React.ChangeEvent<HTMLDivElement>) => {
            setDefaultQuestionType(event.target.id.slice(15) as QuestionType);
          }}
        >
          <h5>카테고리</h5>
          <input type="text" className={`clean ${styles["form-category"]}`}
            placeholder="공백으로 카테고리를 구분할 수 있어요."
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              setCategory(event.target.value.split(" "));
            }}
          />
        </div>
      </div>

      {questions.length === 0
      ? <EmptyFormAlert callback={addQuestion}/>
      : <AddQuestionButton index={0} callback={addQuestion} />}
      
      <div className="question-blocks-container">
        {
          questions.map((question, i) => {
            return (
              <div className={styles["question-manager"]} key={question._id}>
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

      <div style={{
        textAlign: "right"
      }}>
        <button
          type="submit"
          onClick={uploadForm}
          className="submit-button"
        >
          업로드
        </button>
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

function EmptyFormAlert({
  callback
}: {
  callback: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}) {

  return (
    <button
      className={`${styles["empty-form-alert"]} clean`}
      onClick={event => {
        callback(event, 0);
      }}
    >
      <img src="/images/empty-form.png" alt="it is empty form." />
      <h3>아직 아무 문항이 없습니다!</h3>
      <span>이 이미지를 눌러 새로운 문항을 추가하세요.</span>
    </button>
  );
}