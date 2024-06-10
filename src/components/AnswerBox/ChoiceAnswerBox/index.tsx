import styles from "./styles.module.scss";
import { v4 as v4uuid } from "uuid";

export default function ChoiceAnswerBox({
  choices,
  index,
  editable = false,
  question,
  updateQuestion
}: {
  choices: ContentType[];
  index: number;
  editable?: boolean;
  question?: Question;
  updateQuestion?: (index: number, updatedQuestion?: Question) => void;
}) {
  const choicesMapping: JSX.Element[] = choices.map((choice, i) => 
    <div className={`radio-container ${editable ? styles["editable"] : ""}`} key={choice.id}>
      <input type="radio" name={`${question?._id}`} id={`choice-${index}-${i}`} value={choice.data} />
      <label htmlFor={`choice-${index}-${i}`}>
        {
          editable ?
            <div className={styles["editable-choice-box"]}>
              <input
                type="text"
                className={`clean ${styles["choices"]}`}
                placeholder="선택지 항목을 입력하세요"
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  if (updateQuestion && question && choices) {
                    let newChoices = [...choices];
                    newChoices.splice(i, 1, {
                      id: v4uuid(),
                      type: "txt",
                      data: event.target.value
                    });
                    updateQuestion(index, {...question, choices: newChoices})
                  }
                }}
                defaultValue={choice.data}
              />
              <div style={{flex: "1 0 0"}}></div>
              <button
                onClick={(event) => {
                  event.preventDefault();

                  if (updateQuestion && question && choices) {
                    updateQuestion(index, {...question, choices: choices.toSpliced(i, 1)})
                  }
                }}
                className={`clean ${styles["close-icon"]}`}
              ><span className={`material-symbols-outlined`}>close</span></button>
            </div>
          :
            <span>{choice.data}</span>
        }
      </label>
    </div>
  );

  return (
    <div className={`answer-box ${styles["choice-answer"]}`}>
      {choicesMapping}
      {
        editable?
          <button className={styles["add-choice"]}
            onClick={(event) => {
              event.preventDefault();

              if (updateQuestion && question && question.choices) {
                updateQuestion(index, {
                  ...question, choices: [...choices, {type: "txt", data: ""}]
                });
              }
            }}
          >+ 선택지 추가</button>
        :
          null
      }
    </div>
  )
}