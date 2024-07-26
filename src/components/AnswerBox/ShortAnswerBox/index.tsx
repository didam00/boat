import styles from "./styles.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function ShortAnswerBox({
  index,
  question
}: {
  index: number
  question: Question
}) {
  return (<div className={`answer-box ${styles["short-answer"]}`}>
    <SmallInputBox
      type="text"
      name={`${question._id}`}
      placeholder="한 개의 단어를 입력해주세요."
      required
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      }}
    />
  </div>)
}

