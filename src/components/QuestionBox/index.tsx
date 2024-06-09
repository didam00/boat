"use client"

import styles from "./styles.module.scss";
import EssayAnswerBox from "@/components/AnswerBox/EssayAnswerBox";
import ChoiceAnswerBox from "@/components/AnswerBox/ChoiceAnswerBox";
import MultiChoiceAnswerBox from "@/components/AnswerBox/MultiChoiceAnswerBox";
import ShortAnswerBox from "@/components/AnswerBox/ShortAnswerBox";
import MultiShortAnswerBox from "@/components/AnswerBox/MultiShortAnswerBox/index.client";
import React, { useState } from "react";

export default function QuestionBox({
  question,
  questionIndex: index,
  editable = false,
  updateQuestion
}: {
  question: Question;
  questionIndex: number;
  editable?: boolean;
  updateQuestion?: (index: number, updatedQuestion?: Question) => void;
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
      <div className={styles["options-container"]}>
        <button
          className={styles["delete"]}
          onClick={() => {
            updateQuestion(index)
          }}
        >문항 삭제</button>
        <div style={{flex: "1 0 0"}}></div>
        <form className={styles["required-option-form"]}>
          <input 
            id={`required-option-${question.id}`}
            type="checkbox" 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateQuestion(index, {...question, required: event.target.checked})
            }}
            defaultChecked={question.required}
          />
          <label htmlFor={`required-option-${question.id}`}>
            <div className={styles["switch-container"]}>
              <div className={styles["switch-lever"]}>
                <span>필수</span>
              </div>
            </div>
          </label>
        </form>
        <form 
          className={styles["type-option-form"]}
          onChange={(event: React.ChangeEvent<HTMLFormElement>) => {
            updateQuestion(index, {
              ...question,
              type: event.target.id.slice(0, -7) as QuestionType
            })
          }}
        >
          <TypeOptionItem id="choice" label="선택형" checked={"choice"===question.type} />
          <TypeOptionItem id="multi-choice" label="다중선택형" checked={"multi-choice"===question.type} />
          <TypeOptionItem id="short" label="단답형" checked={"short"===question.type} />
          <TypeOptionItem id="multi-short" label="다답형" checked={"multi-short"===question.type} />
          <TypeOptionItem id="essay" label="서술형" checked={"essay"===question.type} />
        </form>
      </div>
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
    answerBox = <ChoiceAnswerBox choices={question.choices} index={index} editable updateQuestion={updateQuestion} question={question}/>
  } else if (question.type === "multi-choice" && question.choices) {
    answerBox = <MultiChoiceAnswerBox choices={question.choices} index={index} editable />
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
      <div className={styles["prefix-box"]}>
        {question.required ? <span><img src="/svgs/asterisk.svg"></img>필수 항목입니다.</span> : ""}
      </div>
      {titleNode}
      {descBox}
      <form>
        {answerBox}
      </form>
      <div style={{flex: "1 0 0"}}></div>
      {optionNode}
    </section>
  );
}

function TypeOptionItem({
  id,
  label,
  checked = false
}: {
  id: string,
  label: string,
  checked?: boolean
}) {
  return (
    <label 
      className={styles["type-option-container"]}
    >
      <input type="radio" name="type-options" id={id+"-option"} defaultChecked={checked} />
      {label}
    </label>
  )
}