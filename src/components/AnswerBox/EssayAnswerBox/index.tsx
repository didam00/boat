import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function EssayAnswerBox({
  index
}: {
  index: number
}) {
  return (<div className={`answer-box ${styles["essay-answer"]}`}>
    <textarea
      name={`essay-${index}`}
      placeholder="문장을 입력해주세요."
      required
    >  
    </textarea>
  </div>)
}