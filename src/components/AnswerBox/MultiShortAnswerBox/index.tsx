"use client"

import { KeyboardEventHandler, useState } from "react";
import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function MultiShortAnswerBox({
  index
}: {
  index: number
}) {
  const [answers, setAnswers] = useState<string[]>([]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addAnswer(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  }

  function addAnswer(text: string) {
    setAnswers(prevAnswers => [...prevAnswers, text]);
  }

  return (
    <div 
      className={`answer-box ${styles["multi-short-answer"]}`}
    >
      <SmallInputBox
        type="text"
        name={`short-${index}`}
        placeholder="'Enter' 키로 단어를 하세요!"
        required
        onkeydown={handleKeyDown}
      />
      <div className={styles["answers-box"]}>
        {answers.map((answer, i) => (
          <div key={i} className={styles["answer"]}>
            <span className={styles["text"]}>{answer}</span>
            <img className={styles["close-icon"]} src="/svgs/close-icon.svg" alt="close icon" />
          </div>
        ))}
      </div>
    </div>
  )
}