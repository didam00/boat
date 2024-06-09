import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function EssayAnswerBox({
  index,
  question
}: {
  index: number
  question: Question
}) {
  return (<div className={`answer-box ${styles["essay-answer"]}`}>
    <textarea
      name={`${question._id}`}
      placeholder="문장을 입력해주세요."
      required
    >  
    </textarea>
  </div>)
}