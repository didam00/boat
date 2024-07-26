"use client"

import styles from "./styles.module.scss";
import EssayAnswerBox from "@/components/AnswerBox/EssayAnswerBox";
import ChoiceAnswerBox from "@/components/AnswerBox/ChoiceAnswerBox";
import MultiChoiceAnswerBox from "@/components/AnswerBox/MultiChoiceAnswerBox";
import ShortAnswerBox from "@/components/AnswerBox/ShortAnswerBox";
import MultiShortAnswerBox from "@/components/AnswerBox/MultiShortAnswerBox";
import React, { useState } from "react";
import SmallInputBox from "../SmallInputBox";

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
        {
        question.type == "multi-choice" || question.type == "multi-short" ?
        <div className={styles["count-option-form"]}>
          <label className={styles["min-choices"]}>
            <input
              type="number" name="min-choices" className={`clean`} defaultValue={0}
              onChange={(event: React.FocusEvent<HTMLInputElement>) => {
                updateQuestion(index, {...question, minChoices: Number(event.target.value)})
              }}
              pattern="\d*[1-9]\d*"
              value={question.minChoices ? question.minChoices : 0}
            />
          </label>
          ~
          <label className={styles["max-choices"]}>
            <input
              type="number" name="max-choices" className={`clean`} defaultValue={0}
              onChange={(event: React.FocusEvent<HTMLInputElement>) => {
                updateQuestion(index, {...question, maxChoices: Number(event.target.value)})
              }}
              pattern="\d*[1-9]\d*"
              value={question.maxChoices ? question.maxChoices : 0}
            />
          </label>
          개 선택
        </div>
        :
        null
        }
        <div className={styles["required-option-form"]}>
          <input 
            id={`required-option-${question._id}`}
            type="checkbox" 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateQuestion(index, {...question, required: event.target.checked})
            }}
            defaultChecked={question.required}
          />
          <label htmlFor={`required-option-${question._id}`}>
            <div className={styles["switch-container"]}>
              <div className={styles["switch-lever"]}>
                <span>필수</span>
              </div>
            </div>
          </label>
        </div>
        <div 
          className={styles["type-option-form"]}
          onChange={(event: React.ChangeEvent<HTMLDivElement>) => {
            updateQuestion(index, {
              ...question,
              type: event.target.id.slice(0, -7) as QuestionType
            })
          }}
        >
          <TypeOptionItem id="choice" label="선택형" checked={"choice"===question.type} qid={question._id!} />
          <TypeOptionItem id="multi-choice" label="다중선택형" checked={"multi-choice"===question.type} qid={question._id!} />
          <TypeOptionItem id="short" label="단답형" checked={"short"===question.type} qid={question._id!} />
          <TypeOptionItem id="multi-short" label="다답형" checked={"multi-short"===question.type} qid={question._id!} />
          <TypeOptionItem id="essay" label="서술형" checked={"essay"===question.type} qid={question._id!} />
        </div>
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
    answerBox = <ChoiceAnswerBox choices={question.choices} index={index} editable={editable} updateQuestion={updateQuestion} question={question} />
  } else if (question.type === "multi-choice" && question.choices) {
    answerBox = <MultiChoiceAnswerBox choices={question.choices} index={index} editable={editable} updateQuestion={updateQuestion} question={question} />
  } else if (question.type === "short") {
    answerBox = <ShortAnswerBox index={index} question={question}/>
  } else if (question.type === "multi-short") {
    answerBox = <MultiShortAnswerBox index={index} question={question}/>
  } else if (question.type === "essay") {
    answerBox = <EssayAnswerBox index={index} question={question}/>
  }

  let choicesCountComponent;

  if ((question.type === "multi-choice") && question.choices && (question.maxChoices || question.minChoices)) {
    let innerText = "";
    let minValid = false, maxValid = false;
    
    if (question.minChoices && (question.minChoices > 0) && question.minChoices < question.choices.length) {
      if (!question.maxChoices || question.minChoices < question.maxChoices) {
        minValid = true;
        innerText += `최소 ${question.minChoices}개 선택 `
      }
    }

    if (question.maxChoices && (question.maxChoices < question.choices.length)) {
      if (!question.minChoices || question.minChoices < question.maxChoices) {
        maxValid = true;
        innerText += `최대 ${question.maxChoices}개 선택`
      }
    }

    if (minValid && maxValid) innerText = innerText.replace("최대", "그리고 최대");

    if (question.minChoices && question.minChoices && question.minChoices === question.maxChoices && question.maxChoices < question.choices.length) {
      innerText += `${question.maxChoices}개만 선택`
    }

    if (innerText !== "") {
      choicesCountComponent = <span><img src="/svgs/asterisk.svg" />{innerText}</span>
    }
  }

  if (question.type === "multi-short") {
    let innerText = "";
    
    if (question.minChoices && (question.minChoices > 0) && question.maxChoices) {
      if (!question.maxChoices || question.minChoices < question.maxChoices) {
        innerText += `최소 ${question.minChoices}개 선택 `
      }
    }

    if (question.maxChoices) {
      if (!question.minChoices || question.minChoices < question.maxChoices) {
        innerText += `최대 ${question.maxChoices}개 선택`
      }
    }

    if (question.minChoices && question.minChoices && question.minChoices === question.maxChoices) {
      innerText += `${question.maxChoices}개만 선택`
    }

    if (innerText !== "") {
      choicesCountComponent = <span><img src="/svgs/asterisk.svg" />{innerText}</span>
    }
  }

  return (
    <section
      id={`question-${index+1}`}
      className={`question-box ${styles["question-box"]} ${editable ? styles["editable"] : ""} box-container`}
      key={index}
    >
      <div className={styles["prefix-box"]}>
        {question.required ? <span><img src="/svgs/asterisk.svg" />필수 항목입니다.</span> : ""}
        {choicesCountComponent}
      </div>
      {titleNode}
      {descBox}
      <div>
        {answerBox}
      </div>
      <div style={{flex: "1 0 0"}}></div>
      {optionNode}
    </section>
  );
}

function TypeOptionItem({
  id,
  label,
  checked = false,
  qid
}: {
  id: string,
  label: string,
  qid: string,
  checked?: boolean,
}) {
  return (
    <label 
      className={styles["type-option-container"]}
    >
      <input type="radio" name={"type-options-"+qid} id={id+"-option"} defaultChecked={checked} />
      {label}
    </label>
  )
}