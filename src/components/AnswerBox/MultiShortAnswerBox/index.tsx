import { KeyboardEventHandler } from "react";
import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function MultiShortAnswerBox({
  index
}: {
  index: number
}) {
  return (<div className={`answer-box ${styles["short-answer"]}`}>
    <SmallInputBox
      type="text"
      name={`short-${index}`}
      placeholder="'Enter' 키로 단어를 하세요!"
      required
    />
  </div>)
}

function addAnswer(text: string) {
  // TODO: create it. 
}