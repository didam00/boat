import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function ShortAnswerBox({
  index
}: {
  index: number
}) {
  return (<div className={`answer-box ${styles["short-answer"]}`}>
    <SmallInputBox
      type="text"
      name={`short-${index}`}
      placeholder="한 개의 단어를 입력해주세요."
      required
    />
  </div>)
}

