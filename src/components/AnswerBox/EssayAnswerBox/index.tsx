import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function EssayAnswerBox({
  index
}: {
  index: number
}) {
  return (<div className={`answer-box ${styles["essay-answer"]}`}>
    <SmallInputBox
      type="text"
      name={`essay-${index}`}
      placeholder="문장을 입력해주세요."
      required
    />
  </div>)
}