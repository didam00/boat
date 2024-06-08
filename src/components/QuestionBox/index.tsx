"use client"

import styles from "./styles.module.scss";
import EssayAnswerBox from "@/components/AnswerBox/EssayAnswerBox";
import ChoiceAnswerBox from "@/components/AnswerBox/ChoiceAnswerBox";
import MultiChoiceAnswerBox from "@/components/AnswerBox/MultiChoiceAnswerBox";
import ShortAnswerBox from "@/components/AnswerBox/ShortAnswerBox";
import MultiShortAnswerBox from "@/components/AnswerBox/MultiShortAnswerBox/index.client";
import { useState } from "react";

export default function QuestionBox({
  question,
  index,
  editable = false,
  updateQuestion
}: {
  question: QuestionType;
  index: number;
  editable?: boolean;
  updateQuestion?: (index: number, updatedQuestion: QuestionType) => void;
}) {
  let titleNode: React.ReactNode;
  let optionNode: React.ReactNode;
  let answerBox: React.ReactNode;
  let descBox: JSX.Element[];
  
  if (editable && updateQuestion) {
    titleNode = (
      <input
        className={`clean ${styles["question-title"]} ${styles["editable"]}`}
        name="question-title"
        placeholder={`${index+1}. 문항 제목을 입력해주세요.`}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          updateQuestion(index, {...question, title: event.target.value})
        }}
        autoComplete="off"
        defaultValue={question.title}
      >
      </input>
    )
    
    optionNode = (
      <form>
        <div>
          <label htmlFor="choice">선택형</label>
          <input type="radio" name="choice" id="choice-option" />
        </div>
        <div>
          <label htmlFor="short">단답형</label>
          <input type="radio" name="short" id="short-option" />
        </div>
        <div>
          <label htmlFor="essay">서술형</label>
          <input type="radio" name="essay" id="essay-option" />
        </div>
      </form>
    )
  } else {
    titleNode = (<h3 className={styles["question-title"]}>{index+1}. {question.title}</h3>);
  }

  descBox = question.content.map((c, i) => {
    const Component = c.type === "img" ? "figure" : "span";
    return (
      <Component key={i} className={styles["question-desc"]}>
        {c.type === "img" ? <img src={c.data} /> : c.data}
        {c.caption ? <span className="caption">{c.caption}</span> : null}
      </Component>
    );
  });

  if (question.type === "choice" && question.choices) {
    answerBox = <ChoiceAnswerBox choices={question.choices} index={index} />
  } else if (question.type === "multi-choice" && question.choices) {
    answerBox = <MultiChoiceAnswerBox choices={question.choices} index={index} />
  } else if (question.type === "short") {
    answerBox = <ShortAnswerBox index={index} />
  } else if (question.type === "multi-short") {
    answerBox = <MultiShortAnswerBox index={index} />
  } else if (question.type === "essay") {
    answerBox = <EssayAnswerBox index={index} />
  }

  return (
    <section
      id={`question-${index+1}`}
      className={`${styles["question-box"]} ${editable ? styles["editable"] : ""} box-container`}
      key={index}
    >
      {titleNode}
      {descBox}
      <form>
        {answerBox ? answerBox : null}
      </form>
    </section>
  );
}